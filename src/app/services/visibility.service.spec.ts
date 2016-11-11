/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisibilityService } from './visibility.service';

describe('Service: Visibility', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisibilityService]
    });
  });

  it('should ...', inject([VisibilityService], (service: VisibilityService) => {
    expect(service).toBeTruthy();
  }));
});
