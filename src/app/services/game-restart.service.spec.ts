/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameRestartService } from './game-restart.service';

describe('Service: GameRestart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameRestartService]
    });
  });

  it('should ...', inject([GameRestartService], (service: GameRestartService) => {
    expect(service).toBeTruthy();
  }));
});
