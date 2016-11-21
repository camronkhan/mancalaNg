import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupModule } from '../setup/setup.module';
import { ScoreboardModule } from '../scoreboard/scoreboard.module';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { GameboardComponent } from './gameboard.component';
import { HighlightDirective } from '../directives/highlight.directive';
import { GameStartService } from '../services/game-start.service';
import { GameRestartService } from '../services/game-restart.service';
import { GameOverService } from '../services/game-over.service';
import { Gameboard } from '../models/gameboard';

@NgModule({
    imports: [ CommonModule, SetupModule, ScoreboardModule ],
    declarations: [ GameboardComponent, HighlightDirective ],
    exports: [ GameboardComponent ],
    providers: [ HighlightDirective, GameStartService, GameRestartService, GameOverService, Gameboard ]
})
export class GameboardModule { }