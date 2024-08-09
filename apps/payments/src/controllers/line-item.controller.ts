import { Controller, Get } from '@nestjs/common';
import { LineItemUseCases } from '@/use-cases/line-item/line-item.use-case';

@Controller('api/line-item')
export class LineItemController {
  constructor(private lineItemUseCases: LineItemUseCases) {}

  @Get()
  async getAll() {
    return this.lineItemUseCases.getAllLineItems();
  }
}
