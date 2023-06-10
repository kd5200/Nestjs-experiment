import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from './dto/product.dto';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  status?: ProductStatus | null;

  @Column({ nullable: true })
  quantity?: number | null;
}
