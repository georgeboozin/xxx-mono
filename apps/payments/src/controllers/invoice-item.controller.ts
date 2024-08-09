import { Controller, Post, Body } from '@nestjs/common';
import { CreateInvoiceItemDto } from '@/core/dtos/invoice-item.dto';
import { InvoiceItemUseCases } from '@/use-cases/invoice-item/invoice-item.use-case';

@Controller('api/invoice-item')
export class InvoiceItemController {
  constructor(private invoiceItemUseCases: InvoiceItemUseCases) {}

  @Post()
  createInvoiceItem(@Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    return this.invoiceItemUseCases.create(createInvoiceItemDto);
  }
}
