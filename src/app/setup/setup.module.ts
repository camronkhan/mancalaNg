import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { GameStartService } from '../services/game-start.service';
import { Player } from '../models/player';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ SetupComponent ],
    exports: [ SetupComponent ],
    providers: [ GameStartService, Player ]
})
export class SetupModule { }
