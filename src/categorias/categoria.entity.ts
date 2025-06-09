import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Producto } from '../productos/producto.entity';

//entidades para las categorias 
@Entity('categorias')
export class Categoria {
  @ApiProperty({ description: 'ID único de la categoría' })
  @PrimaryGeneratedColumn()
  id_categoria: number; //id de categoria

  @ApiProperty({ description: 'Nombre de la categoría', example: 'Bebidas Calientes' })
  @Column()
  @IsString()
  @IsNotEmpty()
  nombre_categoria: string; //nombre  de dicha categoria

  @ApiProperty({ description: 'Descripción de la categoría', example: 'Todas las bebidas que se sirven calientes' })
  @Column('text', { nullable: true })
  @IsString()
  descripcion_categoria: string;  //breve descripcion de la categoria, puede o no ingresar es opcional

  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}
