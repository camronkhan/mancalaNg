import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupModule } from '../setup/setup.module';
import { GameboardComponent } from './gameboard.component';
import { HighlightDirective } from '../directives/highlight.directive';
import { GameStartService } from '../services/game-start.service';
import { GameOverService } from '../services/game-over.service';
import { Gameboard } from '../models/gameboard';

@NgModule({
    imports: [ CommonModule, SetupModule ],
    declarations: [ GameboardComponent, HighlightDirective ],
    exports: [ GameboardComponent ],
    providers: [ HighlightDirective, GameStartService, GameOverService, Gameboard ]
})
export class GameboardModule { }