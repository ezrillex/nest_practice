import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleMediaService } from './console-media.service';

describe('ConsoleMediaService', () => {
  let service: ConsoleMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsoleMediaService],
    }).compile();

    service = module.get<ConsoleMediaService>(ConsoleMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
