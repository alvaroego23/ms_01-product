import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Image, ImageRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ImageRepository extends DefaultCrudRepository<
  Image,
  typeof Image.prototype.id,
  ImageRelations
> {

  public readonly tiene: BelongsToAccessor<Producto, typeof Image.prototype.id>;

  constructor(
    @inject('datasources.mySQL') dataSource: MySqlDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Image, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', productoRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
