import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStartService } from '../services/game-start.service';
import { GameRestartService } from '../services/game-restart.service';
import { GameOverService } from '../services/game-over.service';
import { HistoryService } from '../services/history.service';
import { Player } from '../models/player';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { HistoryComponent } from '../history/history.component';

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, OnDestroy {
    private _gameboardVisible: boolean;
    private _subscription: Subscription;
    private _gameboard: Array<number>;

    constructor(
        private _gameStartService: GameStartService,
        private _gameRestartService: GameRestartService,
        private _gameOverService: GameOverService,
        private _historyService: HistoryService,
        @Inject('PlayerA') private _playerA: Player,
        @Inject('PlayerB') private _playerB: Player
    ) {
        this._gameStartService.gameStartAnnounced$.subscribe(p => { this._gameboardVisible = true; });
        this._gameRestartService.gameRestartAnnounced$.subscribe(p => { this.restartGame(); });
    }

    /*
    * Set starting values when gameboard component is initialized
    * Requirement: 
    */
    ngOnInit() {
        this._gameboardVisible = false;
        this._playerA.turn = true;
        this._gameboard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
        this._historyService.history.push('Let\'s play Mancala!');
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    restartGame() {
        this._playerA.resetScore();
        this._playerB.resetScore();
        this._playerA.turn = true;
        this._playerB.turn = false;
        this._gameboard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
        while (this._historyService.history.length > 0) {
            this._historyService.history.pop();
        }
        this._historyService.history.push('Let\'s play Mancala!');
        this._gameboardVisible = true;
    }

    endGame() {
        this._gameboardVisible = false;
        this._gameOverService.confirmGameOver();
    }

    pocketClicked(pocket: number) {
        // if player clicks on opponent's or empty pocket, do nothing
        let isOwnPocket: boolean = this.checkIfOwnPocket(pocket);
        if (!isOwnPocket || this._gameboard[pocket] === 0) { return; }

        let currentPlayerName = this.getCurrentPlayerName();
        let stones: number = this.removeStonesFromPocket(pocket);
        this._historyService
            .add(`${currentPlayerName} picked up ${stones} stones from pocket ${this.getPositionName(pocket)}.`);

        let endPosition: number = this.distributeStones(pocket, stones);

        // if one player's pockets are all empty, game over
        if (this._gameboard[0] === 0 &&
            this._gameboard[1] === 0 &&
            this._gameboard[2] === 0 &&
            this._gameboard[3] === 0 &&
            this._gameboard[4] === 0 &&
            this._gameboard[5] === 0
        ) {
            this._gameboard[13] += this._gameboard[7];
            this._gameboard[13] += this._gameboard[8];
            this._gameboard[13] += this._gameboard[9];
            this._gameboard[13] += this._gameboard[10];
            this._gameboard[13] += this._gameboard[11];
            this._gameboard[13] += this._gameboard[12];
            this.endGame();
        }

        if (this._gameboard[7] === 0 &&
            this._gameboard[8] === 0 &&
            this._gameboard[9] === 0 &&
            this._gameboard[10] === 0 &&
            this._gameboard[11] === 0 &&
            this._gameboard[12] === 0
        ) {
            this._gameboard[6] += this._gameboard[0];
            this._gameboard[6] += this._gameboard[1];
            this._gameboard[6] += this._gameboard[2];
            this._gameboard[6] += this._gameboard[3];
            this._gameboard[6] += this._gameboard[4];
            this._gameboard[6] += this._gameboard[5];
            this.endGame();
        }

        this.updateScores();

        // if player lands in own mancala, it remains same player's turn
        let currentPlayer: number = this.getCurrentPlayer();
        let currentMancala = this.getCurrentMancala(currentPlayer);
        if (endPosition === currentMancala) {
            this._historyService
                .add(`${currentPlayerName} landed on ${this.getPositionName(endPosition)}. Take another turn!`);
            return;
        }

        // change current player
        let opponent: string = this.getOpposingPlayerName();
        this._historyService
            .add(`${currentPlayerName} landed on ${this.getPositionName(endPosition)}. ${opponent}, it's your turn!`);
        let nextPlayer = this.changeCurrentPlayer(currentPlayer);
    }

    checkIfOwnPocket(pocket: number): boolean {
        let currentPlayer: number = this.getCurrentPlayer();
        let playerPocket: number = Math.floor(pocket / 7);
        if (playerPocket === currentPlayer) { return true; }
        return false;
    }

    getCurrentPlayer(): number {
        if (this._playerA.turn && !this._playerB.turn) {
            return 0;
        } else if (this._playerB.turn && !this._playerA.turn) {
            return 1;
        } else {
            throw new Error('Player turns unsynchronized')
        }
    }

    getCurrentPlayerName(): string {
        if (this._playerA.turn && !this._playerB.turn) {
            return this._playerA.name;
        } else if (this._playerB.turn && !this._playerA.turn) {
            return this._playerB.name;
        } else {
            throw new Error('Player turns unsynchronized')
        }
    }

    getOpposingPlayer(currentPlayer: number): number {
        switch (currentPlayer) {
            case 0:
                return 1;
            case 1:
                return 0;
            default:
                throw new Error('Current player is not set to 0 or 1');
        }
    }

    getOpposingPlayerName(): string {
        if (this._playerA.turn && !this._playerB.turn) {
            return this._playerB.name;
        } else if (this._playerB.turn && !this._playerA.turn) {
            return this._playerA.name;
        } else {
            throw new Error('Player turns unsynchronized')
        }
    }

    removeStonesFromPocket(pocket: number): number {
        let stones: number = this._gameboard[pocket];
        this._gameboard[pocket] = 0;
        return stones;
    }

    distributeStones(pocket: number, stones: number): number {
        let currentPosition: number = pocket;
        let remainingStones: number = stones;
        let currentPlayer: number = this.getCurrentPlayer();
        let currentPlayerName: string = this.getCurrentPlayerName();
        let currentMancala: number = this.getCurrentMancala(currentPlayer);
        let opponentMancala: number = this.getOpponentMancala(currentPlayer);

        // loop while stones remain
        while (remainingStones > 0) {
            // move to next position
            currentPosition++;

            // if end of array reached, move to beginning
            if (currentPosition > 13) { currentPosition = 0; }

            // only increment stone count if current position is not opponent's mancala
            if (currentPosition !== opponentMancala) {
                this._gameboard[currentPosition]++;
                remainingStones--;

                // announce point scored
                if (this._gameboard[currentPosition] === 6 || this._gameboard[currentPosition] === 13) {
                    this._historyService.add(`${currentPlayerName} scored a point!`);
                }
            }
        }

        // if last stone placed in own empty pocket, get contents of own pocket and of opponent's cross-pocket
        let isOwnPocket = this.checkIfOwnPocket(currentPosition);
        let isMancala = this.checkIfMancala(currentPosition);
        if (isOwnPocket && !isMancala && this._gameboard[currentPosition] === 1) {
            // own current pocket
            this._gameboard[currentMancala]++;
            this._gameboard[currentPosition]--;

            // opponent's cross pocket
            let crossPocket: number = this.getCrossPocket(currentPosition);
            this._gameboard[currentMancala] += this._gameboard[crossPocket];
            this._gameboard[crossPocket] = 0;
        }

        return currentPosition;
    }

    getCurrentMancala(currentPlayer: number): number {
        switch (currentPlayer) {
            case 0:
                return 6;
            case 1:
                return 13;
            default:
                throw new Error('Current player is not set to 0 or 1');
        }
    }

    getOpponentMancala(currentPlayer: number): number {
        switch (currentPlayer) {
            case 0:
                return 13;
            case 1:
                return 6;
            default:
                throw new Error('Current player is not set to 0 or 1');
        }
    }

    changeCurrentPlayer(currentPlayer): number {
        switch (currentPlayer) {
            case 0:
                this._playerA.turn = false;
                this._playerB.turn = true;
                return 1;
            case 1:
                this._playerA.turn = true;
                this._playerB.turn = false;
                return 0;
            default:
                throw new Error('Current player is not set to 0 or 1');
        }
    }

    getCrossPocket(pocket: number): number {
        if ((pocket >= 0 && pocket <= 5) || (pocket >= 7 && pocket <= 12)) {
            return (pocket + 12) - (pocket * 2);
        } else {
            throw new Error('Pocket provided is either a mancala or out of bounds');
        }
    }

    getPositionName(position: number): string {
        if (position >= 0 && position <= 5) {
            return 'A' + (position + 1);
        } else if (position === 6) {
            return 'Mancala A';
        } else if (position >= 7 && position <= 12) {
            return 'B' + (position - 6);
        } else if (position === 13) {
            return 'Mancala B';
        } else {
            throw new Error('Position provided is out of bounds');
        }
    }

    checkIfMancala(pocket: number): boolean {
        return (pocket === 6 || pocket === 13) ? true : false;
    }

    updateScores() {
        this._playerA.score = this._gameboard[6];
        this._playerB.score = this._gameboard[13];
    }
}
