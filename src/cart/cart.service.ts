import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async findAll() {
    return this.cartRepository.find({
      relations: ['items', 'items.product']
    });
  }

  async findOne(id: number) {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items', 'items.product']
    });
    if (!cart) {
      throw new NotFoundException('Cart not found!');
    }
    return cart;
  }

  async findByUserId(userId: number) {
    return this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.product']
    });
  }

  async addItem(userId: number, addItemDto: AddItemDto) {
    const product = await this.productRepository.findOne({ where: { id: addItemDto.productId } });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    let cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      cart = await this.cartRepository.save(this.cartRepository.create({ userId }));
    }

    const existingItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId: addItemDto.productId }
    });

    if (existingItem) {
      existingItem.quantity += addItemDto.quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId: addItemDto.productId,
        quantity: addItemDto.quantity,
        price: product.price
      });
      await this.cartItemRepository.save(newItem)
    }

    await this.updateCartTotal(cart.id)
    return this.findOne(cart.id);
  }

  async removeItem(userId: number, productId: number) {
    let cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      cart = await this.cartRepository.save(this.cartRepository.create({ userId }));
    }

    const item = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId }
    });
    if (!item) {
      throw new NotFoundException('Item not found in cart!');
    }

    await this.cartItemRepository.remove(item);
    await this.updateCartTotal(cart.id);
    return this.findOne(cart.id);
  }

  async updateItemQuantity(userId: number, productId: number, quantity: number) {
    let cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      cart = await this.cartRepository.save(this.cartRepository.create({ userId }));
    }

    const item = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId }
    });
    if (!item) {
      throw new NotFoundException('Item not found in cart!');
    }

    if (quantity <= 0) {
      await this.cartItemRepository.remove(item);
    } else {
      item.quantity = quantity;
      await this.cartItemRepository.save(item);
    }

    await this.updateCartTotal(cart.id);
    return this.findOne(cart.id);
  }

  private async updateCartTotal(cartId: number) {
    const items = await this.cartItemRepository.find({ where: { cartId } });
    const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    await this.cartRepository.update(cartId, { totalPrice: total });
  }
}
