import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
