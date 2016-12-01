import { Injectable } from '@angular/core';

@Injectable()
export class HistoryService {

    private _history: Array<string>;

    constructor() {
      this._history = [];
    }

    /*
    * Retrieves the game history from the data source
    * Requirement: 
    */
    get history(): Array<string> {
      return this._history;
    }

    /*
    * Appends a new history event to the data source
    * Requirement: 
    */
    add(s: string) {
      this._history.push(s);
    }
}
