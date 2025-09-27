import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsDefined({ message: 'La categoría es obligatoria' })
  @IsInt({ message: 'La categoría debe ser un número entero' })
  idCategoria: number;

  @IsDefined({ message: 'El código es obligatorio' })
  @IsInt({ message: 'El código debe ser un número entero' })
  codigo: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @MaxLength(100, {message: 'La descripción no debe exceder 100 caracteres'})
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  descripcion: string;

  @IsDefined({ message: 'La fecha de vencimiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha de vencimiento debe tener un formato válido' })
  fechaVencimiento: Date;
}