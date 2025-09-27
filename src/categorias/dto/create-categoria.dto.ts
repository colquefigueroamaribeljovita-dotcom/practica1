import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El campo descripcion no debe estar vacio' })
  @IsString({ message: 'El campo descripcion debe ser un texto' })
  descripcion: string;
}
