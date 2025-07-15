import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'S24' })
  name: string;

  @ApiProperty({ example: 5000 })
  price: number;

  @ApiProperty({ example : [1, 4]})
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  categoryIds?: number[]; 
}
