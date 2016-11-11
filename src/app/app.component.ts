import { Component, ViewContainerRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private ViewContainerRef: ViewContainerRef;
  public title: string = 'mancalaNg';
  public tagline: string = 'play mancala in your web browser';

  public constructor(ViewContainerRef: ViewContainerRef) {
    this.ViewContainerRef = ViewContainerRef;
  }
}