import { Test, TestingModule } from '@nestjs/testing';
import { GroupingsController } from './groupings.controller';
import { GroupingsService } from './groupings.service';

describe('GroupingsController', () => {
  let controller: GroupingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupingsController],
      providers: [GroupingsService],
    }).compile();

    controller = module.get<GroupingsController>(GroupingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
