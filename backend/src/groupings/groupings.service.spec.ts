import { Test, TestingModule } from '@nestjs/testing';
import { GroupingsService } from './groupings.service';

describe('GroupingsService', () => {
  let service: GroupingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupingsService],
    }).compile();

    service = module.get<GroupingsService>(GroupingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
