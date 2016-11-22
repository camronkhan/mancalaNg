import { Injectable } from '@angular/core';

@Injectable()
export class HistoryService {

  private _history: Array<string>;

  constructor() {
    this._history = [];
    this._history.push('Let\'s play Mancala!');
  }

  get history(): Array<string> {
    return this._history;
  }

  add(s: string) {
    this._history.push(s);
  }
}
