import { TestBed } from '@angular/core/testing';

import { MdnSpeechService } from './mdn-speech.service';

describe('MdnSpeechService', () => {
  let service: MdnSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdnSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
