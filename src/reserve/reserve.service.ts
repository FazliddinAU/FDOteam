import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserve } from './entities/reserve.entity';

@Injectable()
export class ReserveService {
  constructor(@InjectRepository(Reserve) private reserveRepository: Repository<Reserve>) {}

  async create(createReserveDto: CreateReserveDto) {
    const newReserve = await this.reserveRepository.create(createReserveDto)
    return await this.reserveRepository.save(newReserve)
  }

  async findAll() {
    const foundData = await this.reserveRepository.find({
      relations: ['product']
    })
    return foundData
  }

  async findOne(id: number) {
    const reserve = await this.reserveRepository.findOne({
      where: {id},
      relations: ['product']
    })
    if (!reserve) {
      throw new NotFoundException("Reserve not found!")
    }
    return reserve
  }

  async update(id: number, updateReserveDto: UpdateReserveDto) {
    return await this.reserveRepository.update({id}, updateReserveDto)
  }

  async remove(id: number) {
    return await this.reserveRepository.delete(id)
  }
}
