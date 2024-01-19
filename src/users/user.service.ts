import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Rol } from 'src/rols/entities/rols.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: createUserDto.username,
        },
      });

      if (user) {
        throw new HttpException(
          'El usuario ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const rol = await this.rolRepository.findOneOrFail({
        where: {
          name: createUserDto.rol,
        },
      });

      createUserDto.rol = (await rol).id;
      const newUser = await this.userRepository.create({
        ...createUserDto,
        rol: { id: (await rol).id },
      });

      return await this.userRepository.save(newUser);

    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El rol no existe, usuario no creado',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al crear el usuario');
      }
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch {
      (err) => console.log(err)
      throw new Error('Error al obtener los usuarios')
    }
  }

  async findOne(username: string) {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          username: username,
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El usuario no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener el usuario');
      }
    }
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
      }

      const rol = await this.rolRepository.findOneOrFail({
        where: {
          name: updateUserDto.rol,
        },
      });

      updateUserDto.rol = (await rol).id;
      return await this.userRepository.update((await user).id, {
        ...updateUserDto,
        rol: { id: (await rol).id },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El rol no existe, usario no actualizado',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener el usuario');
      }
    }
  }

  async remove(username: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          username: username,
        },
      });

      return this.userRepository.softDelete((await user).id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El usario no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener el usuario');
      }
    }
  }
}
