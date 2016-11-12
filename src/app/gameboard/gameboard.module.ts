import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupModule } from '../setup/setup.module';
import { GameboardComponent } from './gameboard.component';
import { HighlightDirective } from '../directives/highlight.directive';
import { GameStartService } from '../services/game-start.service';

@NgModule({
    imports: [ CommonModule, SetupModule ],
    declarations: [ GameboardComponent, HighlightDirective ],
    exports: [ GameboardComponent ],
    providers: [ HighlightDirective, GameStartService ]
})
export class GameboardModule { }