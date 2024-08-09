import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  stripeAccount: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;
}

export class FinalizeInvoiceDto extends PickType(CreateInvoiceDto, [
  'stripeAccount',
] as const) {}

export class SendInvoiceDto extends PickType(CreateInvoiceDto, [
  'stripeAccount',
] as const) {}
