import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupComponent } from './setup.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ SetupComponent ],
    exports: [ SetupComponent ],
    providers: [  ]
})
export class GameboardModule { }