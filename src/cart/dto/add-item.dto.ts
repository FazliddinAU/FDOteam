import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class AddItemDto {
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    productId: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    quantity: number;
} 