import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rols/rol.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { DataSource } from 'typeorm';
import { RegionsModule } from './regions/regions.module';
import { StateModule } from './states/state.module';
import { CityModule } from './cities/city.module';
import { CustomerModule } from './customers/customer.module';
import { TerminalVendorModule } from './terminal-vendor/terminal-vendor.module';
import { TerminalModelModule } from './terminal-model/terminal-model.module';
import { TerminalTypeModule } from './terminal-type/terminal-type.module';
import { TerminalStatusModule } from './terminal-status/terminal-status.module';
import { TerminalModule } from './terminal/terminal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
        migrations: [__dirname + '/../dist/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_table',
    }
    ),
    RolModule,
    UserModule,
    RegionsModule,
    StateModule,
    CityModule,
    CustomerModule,
    TerminalVendorModule,
    TerminalModelModule,
    TerminalTypeModule,
    TerminalStatusModule,
    TerminalModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
