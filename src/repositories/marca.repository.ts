import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Marca, MarcaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly tiene_mucho_producto: HasManyRepositoryFactory<Producto, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.mySQL') dataSource: MySqlDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Marca, dataSource);
    this.tiene_mucho_producto = this.createHasManyRepositoryFactoryFor('tiene_mucho_producto', productoRepositoryGetter,);
    this.registerInclusionResolver('tiene_mucho_producto', this.tiene_mucho_producto.inclusionResolver);
  }
}
