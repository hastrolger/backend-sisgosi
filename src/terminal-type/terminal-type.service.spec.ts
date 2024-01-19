import { Test, TestingModule } from '@nestjs/testing';
import { TerminalTypeService } from './terminal-type.service';

describe('TerminalTypeService', () => {
  let service: TerminalTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminalTypeService],
    }).compile();

    service = module.get<TerminalTypeService>(TerminalTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
