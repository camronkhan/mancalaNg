import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStartService } from '../services/game-start.service';
import { Player } from '../models/player';
import { Gameboard } from '../models/gameboard';

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
        @Inject('PlayerA') private _playerA: Player,
        @Inject('PlayerB') private _playerB: Player
    ) { this._gameStartService.gameStartAnnounced$.subscribe(p => { this._gameboardVisible = true; }); }

    ngOnInit() {
        this._gameboardVisible = false;
        this._playerA.turn = true;
        this._gameboard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    pocketClicked(pocket: number) {
        // if player clicks on opponent's or empty pocket, do nothing
        let isOwnPocket: boolean = this.checkIfOwnPocket(pocket);
        if (!isOwnPocket || this._gameboard[pocket] === 0) { return; }

        let stones: number = this.removeStonesFromPocket(pocket);
        let endPosition: number = this.distributeStones(pocket, stones);
        let currentPlayer: number = this.getCurrentPlayer();
        let currentMancala = this.getCurrentMancala(currentPlayer);

        // if player lands in own mancala, it remains same player's turn
        if (endPosition === currentMancala) {
            console.log(`Pocket clicked: ${pocket}\nStones retrieved: ${stones}\nEnd Position: ${endPosition}\nNext player: ${currentPlayer}`);
            return; }

        let nextPlayer = this.changeCurrentPlayer(currentPlayer);

        console.log(`Pocket clicked: ${pocket}\nStones retrieved: ${stones}\nEnd Position: ${endPosition}\nNext player: ${nextPlayer}`);
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

    removeStonesFromPocket(pocket: number): number {
        let stones: number = this._gameboard[pocket];
        this._gameboard[pocket] = 0;
        return stones;
    }

    distributeStones(pocket: number, stones: number): number {
        let currentPosition: number = pocket;
        let remainingStones: number = stones;
        let currentPlayer: number = this.getCurrentPlayer();
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

    checkIfMancala(pocket: number): boolean {
        return (pocket === 6 || pocket === 13) ? true : false;
    }
}
