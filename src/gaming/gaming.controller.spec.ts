import { Test, TestingModule } from '@nestjs/testing';
import { GamingController } from './gaming.controller';

describe('GamingController', () => {
  let controller: GamingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamingController],
    }).compile();

    controller = module.get<GamingController>(GamingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
