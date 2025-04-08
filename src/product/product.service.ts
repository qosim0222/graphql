import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma:PrismaService){}

 async create(createProductInput: CreateProductInput) {
   try {
    let created = await this.prisma.product.create({data:createProductInput})
    return {data: created}
   } catch (error) {
    throw new BadRequestException(error.message)
   }
  }

  
  async findAll() {
    try {
      let data = await this.prisma.product.findMany()
      return { data }
    } catch (error) {
      throw new BadRequestException(error.message)

    }

  }

  async findOne(id: number) {
    try {
      let data = await this.prisma.product.findUnique({ where: { id } })
      return { data }
    } catch (error) {
      throw new BadRequestException(error.message)

    }
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    try {
      let updated = await this.prisma.product.update({ where: { id }, data: updateProductInput })
      return { data: updated }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: number) {

    try {
      let deleted = await this.prisma.product.delete({ where: { id } })
    return {data: deleted}
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}