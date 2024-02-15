import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Marca extends Entity {
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

  @hasMany(() => Producto, {keyTo: 'id_marca'})
  tiene_mucho_producto: Producto[];

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
