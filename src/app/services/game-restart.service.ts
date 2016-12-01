import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Player } from '../models/player';

@Injectable()
export class GameRestartService {
    private gameRestartAnnouncedSource = new Subject<Array<Player>>();
    private gameRestartConfirmedSource = new Subject<Array<Player>>();

    gameRestartAnnounced$ = this.gameRestartAnnouncedSource.asObservable();
    gameRestartConfirmed$ = this.gameRestartConfirmedSource.asObservable();

    constructor() { }

    /*
    * Emits an observable that announces to subscribers when a game restarts
    * Requirement: 
    */
    announceGameRestart() {
      this.gameRestartAnnouncedSource.next();
    }

    /*
    * Emits an observable when it is convfirmed that a game has restarted
    * Requirement: 
    */
    confirmGameRestart() {
      this.gameRestartConfirmedSource.next();
    }
}