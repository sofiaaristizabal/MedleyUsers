import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsuariosService {

  constructor(
   @InjectRepository(Usuario)
   private readonly usuarioRepository: Repository<Usuario>  
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const existe = await this.usuarioRepository.findOneBy({email: createUsuarioDto.email});
      if (existe){
        throw new BadRequestException('El usuario ya existe')
      }
      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: await bcrypt.hash(createUsuarioDto.password, 10),
        fecha_nacimiento: new Date(createUsuarioDto.fecha_nacimiento)
      });
      await this.usuarioRepository.save(usuario);
      return usuario; 
    } catch(err){
      console.log(err)
      throw new BadRequestException(err.detail || 'Error al crear el usuario');
    }
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({id});
    if(!usuario){
      throw new BadRequestException('Usuario no encontrado');
    } else{
      return usuario; 
    }

  }

  async findByEmail(email: string){
   const usuario = await this.usuarioRepository.findOne({
    where:{
      email
    }
   })

   if(!usuario){
    throw new BadRequestException('usuario no encontrado')
   }else{
    return usuario; 
   }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id,
      ...updateUsuarioDto
    });

    if(!usuario){
    throw new BadRequestException('usuario no encontrado')
   }else{
    return usuario; 
   }
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    return await this.usuarioRepository.remove(usuario);
  }

  async login(loginUsuarioDto: LoginUsuarioDto){
   try{
     const {email, password} = loginUsuarioDto;
     const usuario = await this.usuarioRepository.findOneBy({email});
     if(!usuario){
      throw new BadRequestException('Credenciales invalidas')
     }

     const isValid = bcrypt.compareSync(password, usuario.password);

     if(!isValid){
        throw new BadRequestException('Credenciales invalidas');
     }
     return {usuario:{
      id:usuario.id,
      email:usuario.email}}
   } catch(err){
    console.log(err);
    throw new BadRequestException(err.detail); 
   }
  }




}
