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

  announceGameRestart() {
    this.gameRestartAnnouncedSource.next();
  }

  confirmGameRestart() {
    this.gameRestartConfirmedSource.next();
  }
}