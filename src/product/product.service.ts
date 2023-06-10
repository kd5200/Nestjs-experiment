import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async createProduct(productDto: ProductDto): Promise<Product> {
    console.log('productDto', productDto);
    return await this.productRepository.createProduct(productDto);
  }
  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.getProductById(id);
  }
}
