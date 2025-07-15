import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { Reserve } from './entities/reserve.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
