import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {Categoria} from './categoria.model';
import {CategoriaProducto} from './categoria-producto.model';
import {Image} from './image.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  existencia?: number;

  @property({
    type: 'number',
    default: 0,
  })
  calificacion?: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaProducto, keyFrom: 'id_producto', keyTo: 'id_categoria'}})
  tiene_categoria: Categoria[];

  @hasMany(() => Image, {keyTo: 'id_producto'})
  tiene_imagenes: Image[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
