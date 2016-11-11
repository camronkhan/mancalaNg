import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  private gameboardVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.gameboardVisible = false;
  }

  showGameboard() {
    this.gameboardVisible = true;
  }
}
