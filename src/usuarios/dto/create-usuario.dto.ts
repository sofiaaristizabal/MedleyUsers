import { IsString, IsIn, IsDateString, MinLength, MaxLength, Matches, IsDate, MinDate, MaxDate, IsEmail } from "class-validator";
import { Type } from "class-transformer";
export class CreateUsuarioDto {

    @IsString()
    @IsEmail()
    email: string
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            { message: 'password too weak' })
    password:string
    @IsString()
    nombre:string
    @IsString()
    apellido:string
    @Type(()=> Date)
    @IsDate({ message: 'fecha_nacimiento debe ser una fecha válida' })
    @MinDate(new Date('1900-01-01'), {
    message: 'fecha de nacimiento no puede ser anterior a 1900',
    })
    @MaxDate(new Date(), {
    message: 'fecha de nacimiento no puede estar en el futuro',
    })
    fecha_nacimiento: Date;
    @IsString()
    @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    tipo_sangre:string
    @IsString()
    direccion:string
    @IsString()
    EPS:string
    @IsString()
    @IsIn(['femenino', 'masculino'])
    sexo:string
    @IsString()
    telefono:string


}
