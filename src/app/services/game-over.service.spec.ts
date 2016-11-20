/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameOverService } from './game-over.service';

describe('Service: GameOver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameOverService]
    });
  });

  it('should ...', inject([GameOverService], (service: GameOverService) => {
    expect(service).toBeTruthy();
  }));
});
