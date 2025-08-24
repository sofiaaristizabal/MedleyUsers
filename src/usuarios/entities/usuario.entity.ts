import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    nombre: string
    @Column()
    apellido: string
    @Column({type: 'date'})
    fecha_nacimiento:Date
    @Column()
    tipo_sangre: string
    @Column()
    direccion: string
    @Column()
    EPS: string
    @Column()
    sexo: string
    @Column()
    telefono: string
    

}
