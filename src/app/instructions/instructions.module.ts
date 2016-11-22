import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from './instructions.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ InstructionsComponent ],
    exports: [ InstructionsComponent ],
    providers: [ ]
})
export class InstructionsModule { }