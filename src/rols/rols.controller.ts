import { Controller, Get } from '@nestjs/common';

@Controller('rols')
export class RolsController {

    @Get()
    findAll(): string {
        return 'This action returns all rols';
    }

}
