import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolsService } from 'src/rols/rols.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly rolService: RolsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const rol = await this.rolService.findOne(createUserDto.rol);

    createUserDto.rol = (await rol).id;

    const newUser = await this.userRepository.create({
      ...createUserDto,
      rol: { id: (await rol).id },
    });

    return this.userRepository.save(newUser);
  }

 async findAll() {
    return await this.userRepository.find();
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const rol = await this.rolService.findOne(updateUserDto.rol);

    updateUserDto.rol = (await rol).id;

    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    return this.userRepository.update((await user).id, {
      ...updateUserDto,
      rol: { id: (await rol).id },
    });
  }

  async remove(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    return this.userRepository.softDelete((await user).id);
  }
}
