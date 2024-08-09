import { Controller, Get } from '@nestjs/common';
import { ProductUseCases } from '@/use-cases/product/product.use-case';

@Controller('api/product')
export class ProductController {
  constructor(private productUseCases: ProductUseCases) {}

  @Get()
  async getAll() {
    return this.productUseCases.getAllProducts();
  }
}
