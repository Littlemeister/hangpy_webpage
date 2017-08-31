/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetarticleService } from './getarticle.service';

describe('GetarticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetarticleService]
    });
  });

  it('should ...', inject([GetarticleService], (service: GetarticleService) => {
    expect(service).toBeTruthy();
  }));
});
