import { Test, TestingModule } from '@nestjs/testing';
import { SkillSetsService } from './skill_sets.service';

describe('SkillSetsService', () => {
  let service: SkillSetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillSetsService],
    }).compile();

    service = module.get<SkillSetsService>(SkillSetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
