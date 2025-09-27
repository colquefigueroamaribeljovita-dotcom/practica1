import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_categoria' })
  idCategoria: number;

  @Column('varchar', { length: 50 })
  codigo: string;

  @Column('varchar', { length: 100 })
  descripcion: string;

  @Column('date', { name: 'fecha_vencimiento' })
  fechaVencimiento: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Categoria, categoria => categoria.productos)
  @JoinColumn({name: 'id_categoria', referencedColumnName: 'id'})
  categoria: Categoria;
}