export class Player {
    private _name: string;
    private _score: number;
    private _turn: boolean;

    constructor () {
        this._name = '';
        this._score = 0;
        this._turn = false;
    }

    get name(): string {
        return this._name;
    }

    set name(n: string) {
        this._name = n;
    }

    get score(): number {
        return this._score;
    }

    set score(s: number) {
        this._score = s;
    }

    resetScore() {
        this._score = 0;
    }

    incrementScore() {
        this._score++;
    }

    get turn(): boolean {
        return this._turn;
    }

    set turn(t: boolean) {
        this._turn = t;
    }
}
