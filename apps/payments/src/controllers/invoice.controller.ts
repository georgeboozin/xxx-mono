import { Controller, Post, Body, Param } from '@nestjs/common';
import { InvoiceUseCases } from '@/use-cases/invoice/invoice.use-case';
import {
  CreateInvoiceDto,
  FinalizeInvoiceDto,
  SendInvoiceDto,
} from '@/core/dtos/invoice.dto';

@Controller('api/invoice')
export class InvoiceController {
  constructor(private invoiceUseCases: InvoiceUseCases) {}

  @Post()
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceUseCases.create(createInvoiceDto);
  }

  @Post(':id/finalize')
  finalizeInvoice(
    @Param('id') id: string,
    @Body() finalizeInvoiceDto: FinalizeInvoiceDto,
  ) {
    return this.invoiceUseCases.finalize(finalizeInvoiceDto, id);
  }

  @Post(':id/send')
  sendInvoice(@Param('id') id: string, @Body() sendInvoiceDto: SendInvoiceDto) {
    return this.invoiceUseCases.send(sendInvoiceDto, id);
  }
}
