import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductosService {
  constructor(@InjectRepository(Producto) private productosRepository: Repository<Producto>) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    let producto = await this.productosRepository.findOneBy({
          idCategoria: createProductoDto.idCategoria,
          codigo: createProductoDto.codigo,
          descripcion: createProductoDto.descripcion,
          fechaVencimiento: createProductoDto.fechaVencimiento,
   });
        if (producto) throw new ConflictException('Error, el producto ya existe');
        producto = new Producto();
        Object.assign(producto, createProductoDto);
        return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
   return this.productosRepository.find({
      relations: {categoria: true},
      select:{
        id: true,
        codigo: true,
        descripcion: true,
        fechaVencimiento: true,
        categoria: {id: true,descripcion: true, }
      },
      order: {codigo: 'ASC'},
    });
  }

  async findOne(id: number): Promise<Producto> {
     const producto = await this.productosRepository.findOne({
      where: {id},
      relations: {categoria: true},
    });
    if(!producto) throw new NotFoundException('-------');
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto,updateProductoDto);
    return this.productosRepository.save(producto);
  }

  async remove(id: number): Promise<Producto> {
     const producto = await this.findOne(id);
    return this.productosRepository.softRemove(producto);
  }
}