import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Marca, Categoria, CategoriaProducto, Image} from '../models';
import {MarcaRepository} from './marca.repository';
import {CategoriaProductoRepository} from './categoria-producto.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImageRepository} from './image.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly tiene_marca: BelongsToAccessor<Marca, typeof Producto.prototype.id>;

  public readonly tiene_categoria: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaProducto,
          typeof Producto.prototype.id
        >;

  public readonly tiene_imagenes: HasManyRepositoryFactory<Image, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mySQL') dataSource: MySqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('CategoriaProductoRepository') protected categoriaProductoRepositoryGetter: Getter<CategoriaProductoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImageRepository') protected imageRepositoryGetter: Getter<ImageRepository>,
  ) {
    super(Producto, dataSource);
    this.tiene_imagenes = this.createHasManyRepositoryFactoryFor('tiene_imagenes', imageRepositoryGetter,);
    this.registerInclusionResolver('tiene_imagenes', this.tiene_imagenes.inclusionResolver);
    this.tiene_categoria = this.createHasManyThroughRepositoryFactoryFor('tiene_categoria', categoriaRepositoryGetter, categoriaProductoRepositoryGetter,);
    this.registerInclusionResolver('tiene_categoria', this.tiene_categoria.inclusionResolver);
    this.tiene_marca = this.createBelongsToAccessorFor('tiene_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene_marca', this.tiene_marca.inclusionResolver);
  }
}
