import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Rol } from 'src/rols/entities/rols.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>
  ) { }

  async create(createUserDto: CreateUserDto) {
    /**
     * get city by cityRepository to validate if exists
     */
    let user: any;
    try {
      user = await this.userRepository.findOne({
        where: {
          username: createUserDto.username,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener el usuario');
    }

    if (!user) {
      let rol: any;
      try {
        rol = await this.rolRepository.findOne({
          where: {
            name: createUserDto.rol,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener el rol');
      }

      if (rol) {
        createUserDto.rol = (await rol).id;
        const newUser = await this.userRepository.create({
          ...createUserDto,
          rol: { id: (await rol).id },
        });
        return await this.userRepository.save(newUser);
      } else {
        throw new HttpException(
          'El rol no existe, usuario no creado',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
        throw new HttpException(
          'El usuario ya existe',
          HttpStatus.NOT_FOUND,
        );
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
    let user: any
    try {
      user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
    } catch {
      (err) => console.log(err)
      throw new Error('Error al obtener el usuario')
    }

    if (user) {
      return user
    } else {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
    }

  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    /**
     * get user by userRepository
     */
    let user: any;
    try {
      user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener el usuario');
    }

    /**
     * update user if exists
     */
    if (user) {
      let rol: any
      try {
        rol = await this.rolRepository.findOne({
          where: {
            name: updateUserDto.rol,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener el rol')
      }

      if (rol) {
        updateUserDto.rol = (await rol).id;
        return await this.userRepository.update((await user).id, {
          ...updateUserDto,
          rol: { id: (await rol).id },
        });
      } else {
        throw new HttpException('El rol no existe', HttpStatus.NOT_FOUND)
      }
    } else {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
    }
  }

  async remove(username: string) {
    let user: any
    try {
      user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
    } catch {
      (err) => console.log(err)
      throw new Error('Error al obtener el usuario')
    }

    if (user) {
      return this.userRepository.softDelete((await user).id);
    } else {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
    }
  }
}
