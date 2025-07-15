import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}
    async create(createCategoryDto: CreateCategoryDto) {
      const newCategory = await this.categoryRepository.create(createCategoryDto)
      return await this.categoryRepository.save(newCategory)
    }
  
   async findAll() {
      const foundData = await this.categoryRepository.find()
      return foundData
    }
  
    async findOne(id: number) {
      const category = await this.categoryRepository.findOne({where: {id}})
      if (!category) {
        throw new NotFoundException("Category not found!")
      }
      return category
    }
  
    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
      return await this.categoryRepository.update({id}, updateCategoryDto)
    }
  
    async remove(id: number) {
      return await this.categoryRepository.delete(id)
    }
  }