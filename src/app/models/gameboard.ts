export class Gameboard {
    private _playerAPockets: Array<number>;
    private _playerBPockets: Array<number>;

    constructor () {
        this._playerAPockets = [4, 4, 4, 4, 4, 4];
        this._playerBPockets = [4, 4, 4, 4, 4, 4];
    }

    getStonesInPocket(p: string): number {
        let player: string = p.slice(0, 1).toLowerCase();
        let pocket: number = Number(p.slice(-1));

        switch (player) {
            case 'a':
                if (pocket < 1 || pocket > 6) { throw new Error('Invalid pocket number format'); }
                return this._playerAPockets[pocket - 1];
            case 'b':
                if (pocket < 1 || pocket > 6) { throw new Error('Invalid pocket number format'); }
                return this._playerBPockets[pocket - 1];
            default:
                throw new Error('Invalid pocket letter format');
        }
    }

    incrementStonesInPocket(p: string) {
        let player: string = p.slice(0, 1).toLowerCase();
        let pocket: number = Number(p.slice(-1));

        switch (player) {
            case 'a':
                if (pocket < 1 || pocket > 6) { throw new Error('Invalid pocket number format'); }
                this._playerAPockets[pocket - 1]++;
                break;
            case 'b':
                if (pocket < 1 || pocket > 6) { throw new Error('Invalid pocket number format'); }
                this._playerBPockets[pocket - 1]++;
                break;
            default:
                throw new Error('Invalid pocket letter format');
        }
    }

    removeStonesFromPocket(p: string): number {
        let player: string = p.slice(0, 1).toLowerCase();
        let pocket: number = Number(p.slice(-1));
        let numStones = 0;

        switch (player) {
            case 'a':
                if (pocket < 1 || pocket > 6) { throw new Error('Invalid pocket number format'); }
                numStones = this._playerAPockets[pocket - 1];
                this._playerAPockets[pocket - 1] = 0;
                break;
            case 'b':
                if (pocket < 1 || pocket > 6) { throw new Error('Invalid pocket number format'); }
                this._playerBPockets[pocket - 1] = 0;
                numStones = this._playerAPockets[pocket - 1];
                break;
            default:
                throw new Error('Invalid pocket letter format');
        }
        return numStones;
    }
}