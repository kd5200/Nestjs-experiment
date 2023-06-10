import { Repository } from 'typeorm';
import { Product } from './product.entity';

import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {
    super(Product, repo.manager);
  }
  async createProduct(productDto: ProductDto): Promise<Product> {
    const { name, description, price } = productDto;
    const product = this.repo.create({
      name,
      description,
      price,
    });
    this.repo.save(product);
    return product;
  }
  async getProductById(id: string): Promise<Product> {
    const found = await this.repo.findOne({
      where: { id },
    });
    if (!found) {
      throw new Error('Product not found');
    }
    return found;
  }
}
