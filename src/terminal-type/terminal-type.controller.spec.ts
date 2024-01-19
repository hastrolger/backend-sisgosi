import { Test, TestingModule } from '@nestjs/testing';
import { TerminalTypeController } from './terminal-type.controller';
import { TerminalTypeService } from './terminal-type.service';

describe('TerminalTypeController', () => {
  let controller: TerminalTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminalTypeController],
      providers: [TerminalTypeService],
    }).compile();

    controller = module.get<TerminalTypeController>(TerminalTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
