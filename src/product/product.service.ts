import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createProductDto } from './dto/product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const query = await this.productModel.find();

    return query;
  }

  async getProduct(productId: string): Promise<Product> {
    const query = await this.productModel.findById(productId);

    return query;
  }

  async createProduct(createProductDTO: createProductDto): Promise<Product> {
    const query = new this.productModel(createProductDTO);
    await query.save();

    return query;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const query = await this.productModel.findByIdAndDelete(productId);

    return query;
  }

  async updateProduct(
    productId: string,
    createProductDTO: createProductDto,
  ): Promise<Product> {
    const query = await this.productModel.findByIdAndUpdate(
      productId,
      createProductDTO,
      { new: true },
    );

    return query;
  }
}
