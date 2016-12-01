import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Player } from '../models/player';

@Injectable()
export class GameStartService {
    private gameStartAnnouncedSource = new Subject<Array<Player>>();
    private gameStartConfirmedSource = new Subject<Array<Player>>();

    gameStartAnnounced$ = this.gameStartAnnouncedSource.asObservable();
    gameStartConfirmed$ = this.gameStartConfirmedSource.asObservable();

    constructor() { }

    /*
    * Emits an observable that announces to subscribers when a game starts
    * Requirement: 
    */
    announceGameStart() {
      this.gameStartAnnouncedSource.next();
    }

    /*
    * Emits an observable when it is convfirmed that a game has started
    * Requirement: 
    */
    confirmGameStart() {
      this.gameStartConfirmedSource.next();
    }
}