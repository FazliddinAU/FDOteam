import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.findByUserId(+userId)
  }

  @Post(':userId/items')
  addItem(@Param('userId') userId: string, @Body() addItemDto: AddItemDto) {
    return this.cartService.addItem(+userId, addItemDto);
  }

  @Patch(':userId/items/:productId')
  updateQuantity(@Param('userId') userId: string, @Param('productId') productId: string, @Body('quantity') quantity: number){
    return this.cartService.updateItemQuantity(+userId, +productId, quantity)
  }

  @Delete(':userId/items/:productId')
  removeItem(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(+userId, +productId);
  }
}
