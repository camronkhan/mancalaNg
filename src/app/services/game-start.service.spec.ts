/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameStartService } from './game-start.service';

describe('Service: GameStart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStartService]
    });
  });

  it('should ...', inject([GameStartService], (service: GameStartService) => {
    expect(service).toBeTruthy();
  }));
});
