import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './FileUploadService.service';

describe('DetailsprjService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
