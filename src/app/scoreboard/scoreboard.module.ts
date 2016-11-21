import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from './scoreboard.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ScoreboardComponent ],
    exports: [ ScoreboardComponent ],
    providers: [ ]
})
export class ScoreboardModule { }