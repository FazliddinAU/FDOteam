import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Review') 
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi review yaratish' })
  @ApiResponse({ status: 201, description: 'Review muvaffaqiyatli yaratildi' })
  @ApiBody({ type: CreateReviewDto })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha reviewlarni olish' })
  @ApiResponse({ status: 200, description: 'Reviewlar ro‘yxati qaytarildi' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Reviewni ID bo‘yicha olish' })
  @ApiResponse({ status: 200, description: 'Review topildi' })
  @ApiResponse({ status: 404, description: 'Review topilmadi' })
  @ApiParam({ name: 'id', type: Number, description: 'Review IDsi' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Reviewni yangilash' })
  @ApiResponse({ status: 200, description: 'Review yangilandi' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiParam({ name: 'id', type: Number, description: 'Review IDsi' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Reviewni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Review o‘chirildi' })
  @ApiParam({ name: 'id', type: Number, description: 'Review IDsi' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
