import { Component, OnInit, Inject } from '@angular/core';
import { Player } from '../models/player';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private _historyService: HistoryService,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player
  ) { }

  ngOnInit() {
  }

}
