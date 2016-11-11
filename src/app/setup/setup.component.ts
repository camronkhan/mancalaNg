import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  public setupVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.setupVisible = true;
  }

  startGame(event) {
    this.setupVisible = false;
  }

}
