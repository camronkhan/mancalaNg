import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameboardComponent } from './gameboard.component';
import { HighlightDirective } from '../directives/highlight.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ GameboardComponent, HighlightDirective ],
    exports: [ GameboardComponent ],
    providers: [ HighlightDirective ]
})
export class GameboardModule { }