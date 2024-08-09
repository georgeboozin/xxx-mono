import { Controller, Get, Param } from '@nestjs/common';
import { ConnectedAccountUseCases } from '@/use-cases/connected-account/connected-account.use-case';
import { Product } from '@/core/entites/product.entity';
import { LineItem } from '@/core/entites/line-item.entity';
import { Customer } from '@/core/entites/customer.entity';

@Controller('api/connected-account')
export class ConnectedAccountController {
  constructor(private connectedAccountUseCases: ConnectedAccountUseCases) {}

  @Get()
  async getAll() {
    return this.connectedAccountUseCases.getAllAccounts();
  }

  @Get(':id/product')
  getAllProducts(@Param('id') id: string): Promise<Product[]> {
    return this.connectedAccountUseCases.getAllProducts(id);
  }

  @Get(':id/line-item')
  getAllLineItems(@Param('id') id: string): Promise<LineItem[]> {
    return this.connectedAccountUseCases.getAllLineItems(id);
  }

  @Get(':id/customer')
  getAllCustomers(@Param('id') id: string): Promise<Customer[]> {
    return this.connectedAccountUseCases.getAllCustomers(id);
  }
}
