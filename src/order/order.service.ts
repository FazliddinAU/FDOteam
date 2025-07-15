import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(user: User, dto: CreateOrderDto) {
    const order = this.orderRepository.create({
      user,
      userId: user.id,
      status: 'pending',
      items: [],
    });

    for (const itemDto of dto.items) {
      const product = await this.productRepository.findOneBy({ id: itemDto.productId });
      if (!product) {
        throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
      }

      const orderItem = this.orderItemRepository.create({
        product,
        quantity: itemDto.quantity,
        price: product.price,
      });

      order.items.push(orderItem);
    }

    order.totalPrice = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.delete(id);
    return order;
  }
}
