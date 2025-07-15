import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review)
    private reviewRepository : Repository<Review>){}
   create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.create(createReviewDto);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({where : {id}});
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update(id, updateReviewDto)
  }

  remove(id: number) {
    return this.reviewRepository.delete(id);
  }
}
