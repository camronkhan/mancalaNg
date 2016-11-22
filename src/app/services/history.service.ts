import { Injectable } from '@angular/core';

@Injectable()
export class HistoryService {

  private _history: string;

  constructor() { this._history = 'Let\'s play Mancala!\n'; }

  get history(): string {
    return this._history;
  }

  set history(s: string) {
    this._history = s + '\n';
  }
}
