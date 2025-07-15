import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: 'Review qoldirayotgan foydalanuvchi IDsi',
  })
  userId: number;

  @ApiProperty({
    example: 10,
    description: 'Sharh yozilgan mahsulot IDsi',
  })
  productId: number;

  @ApiProperty({
    example: 'Bu mahsulot juda ajoyib!',
    description: 'Foydalanuvchi tomonidan yozilgan review matni',
  })
  content: string;

  @ApiProperty({
    example: 5,
    description: 'Mahsulot uchun baholash (1 dan 5 gacha)',
    minimum: 1,
    maximum: 5,
  })
  rating: number;
}
