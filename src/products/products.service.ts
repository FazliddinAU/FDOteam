import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto)
    return await this.productRepository.save(newProduct)
  }

 async findAll() {
    const foundData = await this.productRepository.find()
    return foundData
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({where: {id}})
    if (!product) {
      throw new NotFoundException("Product not found!")
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update({id}, updateProductDto)
  }

  async remove(id: number) {
    return await this.productRepository.delete(id)
  }
}