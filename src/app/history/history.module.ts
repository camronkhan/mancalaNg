import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { HistoryService } from '../services/history.service';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ HistoryComponent ],
    exports: [ HistoryComponent ],
    providers: [ HistoryService ]
})
export class HistoryModule { }
