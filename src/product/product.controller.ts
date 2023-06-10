import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
@Controller('v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.createProduct(productDto);
  }
  @Get('/:id')
  getProducts(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }
}
