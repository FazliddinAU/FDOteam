import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import envVariables from './config/envVariables';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { ReserveModule } from './reserve/reserve.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envVariables.EMAIL_HOST,
        port: envVariables.EMAIL_PORT,
        secure: 'true',
        auth: {
          user: envVariables.EMAIL_USER,
          pass: envVariables.EMAIL_PASS,
        },
      },
    }),
    JwtModule.register({
      secret : envVariables.JWT_SECRET,
      signOptions : {expiresIn : envVariables.JWT_EXP_IN},
      global : true
    }),
    TypeOrmModule.forRoot({
    type : 'postgres',
    host : envVariables.DB_HOST,
    port : Number(envVariables.DB_PORT),
    username : envVariables.DB_USERNAME,
    database : envVariables.DB_NAME,
    password : envVariables.DB_PASSWORD,
    synchronize : true,
    autoLoadEntities : true
  }), AuthModule, UsersModule, CartModule, ProductsModule, CategoryModule, ReserveModule, OrderModule, OrderItemModule, PaymentModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
