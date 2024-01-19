import { Test, TestingModule } from '@nestjs/testing';
import { TerminalStatusService } from './terminal-status.service';

describe('TerminalStatusService', () => {
  let service: TerminalStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminalStatusService],
    }).compile();

    service = module.get<TerminalStatusService>(TerminalStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
