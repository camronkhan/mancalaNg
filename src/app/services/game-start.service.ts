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

  announceGameStart(players: Array<Player>) {
    this.gameStartAnnouncedSource.next(players);
  }

  confirmGameStart(players: Array<Player>) {
    this.gameStartConfirmedSource.next(players);
  }
}