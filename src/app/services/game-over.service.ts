import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Player } from '../models/player';

@Injectable()
export class GameOverService {
    private gameOverAnnouncedSource = new Subject<Array<Player>>();
    private gameOverConfirmedSource = new Subject<Array<Player>>();

    gameOverAnnounced$ = this.gameOverAnnouncedSource.asObservable();
    gameOverConfirmed$ = this.gameOverConfirmedSource.asObservable();

    constructor() { }

    /*
    * Emits an observable that announces to subscribers when a game ends
    * Requirement: 
    */
    announceGameOver() {
      this.gameOverAnnouncedSource.next();
    }

    /*
    * Emits an observable when it is convfirmed that a game has ended
    * Requirement: 
    */
    confirmGameOver() {
      this.gameOverConfirmedSource.next();
    }
}