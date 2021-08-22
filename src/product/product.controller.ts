import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { createProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async get(@Res() res) {
    const data = await this.productService.getProducts();

    return res.status(HttpStatus.OK).json({
      products: data,
    });
  }

  @Get('/:id')
  async getId(@Res() res, @Param('id') id) {
    const data = await this.productService.getProduct(id);

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/')
  async create(@Body() body: createProductDto, @Res() res) {
    const data = await this.productService.createProduct(body);

    return res.status(HttpStatus.OK).json({
      message: 'Product successfully created',
      product: data,
    });
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id) {
    const data = await this.productService.deleteProduct(id);

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Deleted successfully',
      product: data,
    });
  }

  @Put('/:id')
  async put(@Res() res, @Body() body: createProductDto, @Param('id') id) {
    const data = await this.productService.updateProduct(id, body);

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
      product: data,
    });
  }
}
