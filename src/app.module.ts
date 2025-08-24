import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      ssl:{
        rejectUnauthorized:false
      }
      // host: process.env.DB_HOST,
      // port:+process.env.DB_PORT,
      // username:process.env.DB_USER,
      // password:process.env.DB_PASS,
      // database:process.env.DB_NAME, 
      
    }),
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
