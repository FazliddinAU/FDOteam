import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, product => product.reserves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
