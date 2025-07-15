import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    return this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: ['order', 'product'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
    if (!item) throw new NotFoundException('Order item not found');
    return item;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    await this.orderItemRepository.update(id, updateOrderItemDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<OrderItem> {
    const item = await this.findOne(id);
    await this.orderItemRepository.delete(id);
    return item;
  }
}
