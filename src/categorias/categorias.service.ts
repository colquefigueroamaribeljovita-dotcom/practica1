import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor(@InjectRepository(Categoria) private categoriasRepository: Repository<Categoria>) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    let categoria = await this.categoriasRepository.findOneBy({
      descripcion: createCategoriaDto.descripcion.trim(),
    });
    if (categoria) throw new ConflictException(' ya existe');
    categoria = new Categoria();
    Object.assign(categoria, createCategoriaDto);

    return this.categoriasRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
     return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
   const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) throw new NotFoundException('___');
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.categoriasRepository.save(categoria);
  }

  async remove(id: number): Promise<Categoria> {
    const categoria = await this.findOne(id);
    return this.categoriasRepository.softRemove(categoria);
  }
}
