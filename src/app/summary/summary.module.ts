import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary.component';
import { GameOverService } from '../services/game-over.service';
import { Player } from '../models/player';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ SummaryComponent ],
    exports: [ SummaryComponent ],
    providers: [ GameOverService, Player ]
})
export class SummaryModule { }
