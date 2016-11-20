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

  announceGameOver() {
    this.gameOverAnnouncedSource.next();
  }

  confirmGameOver() {
    this.gameOverConfirmedSource.next();
  }
}