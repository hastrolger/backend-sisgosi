import { Test, TestingModule } from '@nestjs/testing';
import { TerminalStatusController } from './terminal-status.controller';
import { TerminalStatusService } from './terminal-status.service';

describe('TerminalStatusController', () => {
  let controller: TerminalStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminalStatusController],
      providers: [TerminalStatusService],
    }).compile();

    controller = module.get<TerminalStatusController>(TerminalStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
