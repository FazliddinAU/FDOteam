import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { AuthGuard } from 'src/guard/jwt.auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.findByUserId(+userId)
  }

  @UseGuards(AuthGuard)
  @Post(':userId/items')
  addItem(@Param('userId') userId: string, @Body() addItemDto: AddItemDto) {
    return this.cartService.addItem(+userId, addItemDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':userId/items/:productId')
  updateQuantity(@Param('userId') userId: string, @Param('productId') productId: string, @Body('quantity') quantity: number){
    return this.cartService.updateItemQuantity(+userId, +productId, quantity)
  }

  @UseGuards(AuthGuard)
  @Delete(':userId/items/:productId')
  removeItem(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(+userId, +productId);
  }
}
