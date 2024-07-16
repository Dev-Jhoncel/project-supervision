import { Test, TestingModule } from '@nestjs/testing';
import { SkillSetsController } from './skill_sets.controller';
import { SkillSetsService } from './skill_sets.service';

describe('SkillSetsController', () => {
  let controller: SkillSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillSetsController],
      providers: [SkillSetsService],
    }).compile();

    controller = module.get<SkillSetsController>(SkillSetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
