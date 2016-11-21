import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GameboardModule } from './gameboard/gameboard.module';
import { SetupModule } from './setup/setup.module';
import { SummaryModule } from './summary/summary.module';
import { AppComponent } from './app.component';
import { Player } from './models/player';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GameboardModule,
    SetupModule,
    SummaryModule
  ],
  providers: [
    { provide: 'PlayerA', useClass: Player },
    { provide: 'PlayerB', useClass: Player }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
