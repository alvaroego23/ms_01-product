import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Image,
  Producto,
} from '../models';
import {ImageRepository} from '../repositories';

export class ImageProductoController {
  constructor(
    @repository(ImageRepository)
    public imageRepository: ImageRepository,
  ) { }

  @get('/images/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Image',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto),
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Image.prototype.id,
  ): Promise<Producto> {
    return this.imageRepository.tiene(id);
  }
}
