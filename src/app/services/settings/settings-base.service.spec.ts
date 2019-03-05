import { TestBed } from '@angular/core/testing';

import { SettingsBaseService } from './settings-base.service';

describe('SettingsBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsBaseService = TestBed.get(SettingsBaseService);
    expect(service).toBeTruthy();
  });
});
