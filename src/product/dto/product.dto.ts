import { IsNotEmpty } from 'class-validator';

export enum ProductStatus {
  INSTOCK = 'in stock',
  OUT_OF_STOCK = 'out of stock',
}

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  status: ProductStatus;
  quantity: number;
}
