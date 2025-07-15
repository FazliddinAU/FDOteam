import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/cart/entities/cart.entity";
import { Review } from "src/review/entities/review.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @ApiProperty({ example : "Ali", minimum : 3, maximum : 30})
    @Column()
    name : string
    
    @Column({ type:"enum", enum : Roles, default : Roles.USER})
    role : Roles

    @ApiProperty({ example : "Ali001", minimum : 5, maximum : 20})
    @Column()
    username : string

    @ApiProperty({ example : "ali0110@gmail.com", minimum : 10, maximum : 120})
    @Column()
    email : string

    @ApiProperty({ example : "ali$8347", minimum : 6, maximum : 15})
    @Column()
    password : string

    @OneToMany(()=> Cart, cart=> cart.user)
    cart : Cart[]

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}
