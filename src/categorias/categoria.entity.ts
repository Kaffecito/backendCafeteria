

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//entidades para las categorias 
@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number; //id de categoria

  @Column()
  nombre_categoria: string; //nombre  de dicha categoria

  @Column()
  descripcion_categoria: string;  //breve descripcion de la categoria, puede o no ingresar es opcional
}
