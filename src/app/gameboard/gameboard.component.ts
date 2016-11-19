import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStartService } from '../services/game-start.service';
import { Player } from '../models/player';
// import { Gameboard } from '../models/gameboard';

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, OnDestroy {
    private _gameboardVisible: boolean;
    private _subscription: Subscription;
    private _playerAPockets: Array<number>;
    private _playerBPockets: Array<number>;

    constructor(private gameStartService: GameStartService, @Inject('PlayerA') private _playerA: Player, @Inject('PlayerB') private _playerB: Player) {
        gameStartService.gameStartAnnounced$.subscribe(p => { this._gameboardVisible = true; });
    }

    ngOnInit() {
        this._gameboardVisible = false;
        this._playerA.turn = true;
        this._playerAPockets = [4, 4, 4, 4, 4, 4];
        this._playerBPockets = [4, 4, 4, 4, 4, 4];
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    pocketClicked(pocket: string) {
        let ownPocket: boolean = this.checkIfOwnPocket(pocket);
        if (!ownPocket) { return; }

        let pocketLtr: string = pocket.slice(0, 1).toLowerCase();
        let pocketNum: number = Number(pocket.slice(-1));
        let numStones: number = this.removeStonesFromPocket(pocket);

        console.log(`Pocket ${pocket} clicked, and ${numStones} were picked up.`);
    }

    checkIfOwnPocket(pocket: string): boolean {
        let player: string = pocket.slice(0, 1).toLowerCase();
        let currentPlayer = this.getCurrentPlayer();
        if (player === currentPlayer) { return true; }
        return false;
    }

    getCurrentPlayer(): string {
        if (this._playerA.turn && !this._playerB.turn) {
            return 'a';
        } else if (this._playerB.turn && !this._playerA.turn) {
            return 'b';
        } else {
            throw new Error('Player turns unsynchronized')
        }
    }

    distributeStones(pocket: string, stones: number): string {
        let initialPocketLtr: string = pocket.slice(0, 1).toLowerCase();
        let initialPocketNum: number = Number(pocket.slice(-1));
        let currentPocketLtr: string = initialPocketLtr;
        let currentPocketNum: number = initialPocketNum;
        let finalPocketLtr: string;
        let finalPocketNum: number;
        let currentPlayer = this.getCurrentPlayer();
        let remainingStones: number = stones;
        const numTotalPockets = 6;

        while (remainingStones > 0) {
            console.log(`Starting pocket: ${currentPocketLtr}${currentPocketNum}\nRemaining stones: ${remainingStones}`);

            // move to next pocket
            currentPocketNum++;  // A4 = pocket[3]

            // distribute to player's own pockets
            for (let i = currentPocketNum; i <= numTotalPockets; i++) {
                if (remainingStones <= 0) { break; }
                this.incrementStonesInPocket(currentPocketLtr, i);
                remainingStones--;
                currentPocketNum = i;
                console.log(`Incremented pocket: ${currentPocketLtr}${currentPocketNum}\nRemaining stones: ${remainingStones}`);
            }

            // increment own mancala
            if (remainingStones <= 0) { break; }
            switch (currentPlayer) {
                case 'a':
                    this._playerA.incrementScore();
                    remainingStones--;
                    currentPocketNum = -1;
                    console.log(`Incremented mancala: a\nRemaining stones: ${remainingStones}`);
                    break;
                case 'b':
                    this._playerB.incrementScore();
                    remainingStones--;
                    currentPocketNum = -1;
                    console.log(`Incremented mancala: b\nRemaining stones: ${remainingStones}`);
                    break;
                default:
                    throw new Error('Player letter returned value other than A or B');
            }

            // distribute to opponent's pockets but skip opponenet's mancala
            if (remainingStones <= 0) {
                break;
            } else {
                // change current pocket letter to opponent's letter
                currentPocketLtr = currentPocketLtr === 'a' ? 'b' : 'a';
                currentPocketNum = 1;
                console.log(`Updated pocket letter: ${currentPocketLtr}`);

                // distribute
                for (let i = 1; i <= numTotalPockets; i++) {
                    if (remainingStones <= 0) { break; }
                    this.incrementStonesInPocket(currentPocketLtr, i);
                    remainingStones--;
                    currentPocketNum = i;
                    console.log(`Incremented pocket: ${currentPocketLtr}${currentPocketNum}\nRemaining stones: ${remainingStones}`);
                }

                // revert pocket letter to current player's letter
                currentPocketLtr = currentPocketLtr === 'a' ? 'b' : 'a';
                console.log(`Updated pocket letter: ${currentPocketLtr}`);
            }
        }

        // switch current player
        switch (currentPlayer) {
            case 'a':
                this._playerA.turn = false;
                this._playerB.turn = true;
                break;
            case 'b':
                this._playerA.turn = true;
                this._playerB.turn = false;
                break;
            default:
                throw new Error('Player letter returned value other than A or B');
        }

        return '';
    }

  getNumStonesInPocket(p: string): number {
        let player: string = p.slice(0, 1).toLowerCase();
        let pocket: number = Number(p.slice(-1));

        switch (player) {
            case 'a':
                if (pocket < 1 || pocket > 6) { throw new Error('Pocket number less than 1 or greater than 6'); }
                return this._playerAPockets[pocket - 1];
            case 'b':
                if (pocket < 1 || pocket > 6) { throw new Error('Pocket number less than 1 or greater than 6'); }
                return this._playerBPockets[pocket - 1];
            default:
                throw new Error('Player letter returned value other than A or B');
        }
    }

    incrementStonesInPocket(pocketLtr: string, pocketNum: number) {
        let player: string = pocketLtr;
        let pocket: number = pocketNum;

        switch (player) {
            case 'a':
                if (pocket < 1 || pocket > 6) { throw new Error('Pocket number less than 1 or greater than 6'); }
                this._playerAPockets[pocket - 1]++;
                break;
            case 'b':
                if (pocket < 1 || pocket > 6) { throw new Error('Pocket number less than 1 or greater than 6'); }
                this._playerBPockets[pocket - 1]++;
                break;
            default:
                throw new Error('Player letter returned value other than A or B');
        }
    }

    removeStonesFromPocket(p: string): number {
        let player: string = p.slice(0, 1).toLowerCase();
        let pocket: number = Number(p.slice(-1));
        let numStones = 0;

        switch (player) {
            case 'a':
                if (pocket < 1 || pocket > 6) { throw new Error('Pocket number less than 1 or greater than 6'); }
                numStones = this._playerAPockets[pocket - 1];
                this._playerAPockets[pocket - 1] = 0;
                break;
            case 'b':
                if (pocket < 1 || pocket > 6) { throw new Error('Pocket number less than 1 or greater than 6'); }
                this._playerBPockets[pocket - 1] = 0;
                numStones = this._playerAPockets[pocket - 1];
                break;
            default:
                throw new Error('Player letter returned value other than A or B');
        }
        return numStones;
    }
}
