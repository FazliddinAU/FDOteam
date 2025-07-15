import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;


  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @OneToMany(() => Reserve, (reserve) => reserve.product)
  reserves: Reserve[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews : Review[];
}
