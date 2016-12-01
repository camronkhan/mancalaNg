export class Player {
    private _name: string;
    private _score: number;
    private _turn: boolean;

    constructor () {
        this._name = '';
        this._score = 0;
        this._turn = false;
    }

    /*
    * Getter - player's name
    * Requirement: 
    */
    get name(): string {
        return this._name;
    }

    /*
    * Setter - player's name
    * Requirement: 
    */
    set name(n: string) {
        this._name = n;
    }

    /*
    * Getter - player's score
    * Requirement: 
    */
    get score(): number {
        return this._score;
    }

    /*
    * Setter - player's score
    * Requirement: 
    */
    set score(s: number) {
        this._score = s;
    }

    /*
    * Reset's a player's score back to zero
    * Requirement: 
    */
    resetScore() {
        this._score = 0;
    }

    /*
    * Adds one to a player's score
    * Requirement: 
    */
    incrementScore() {
        this._score++;
    }

    /*
    * Getter - returns true if player's turn
    * Requirement: 
    */
    get turn(): boolean {
        return this._turn;
    }

    /*
    * Setter - player's turn
    * Requirement: 
    */
    set turn(t: boolean) {
        this._turn = t;
    }
}
