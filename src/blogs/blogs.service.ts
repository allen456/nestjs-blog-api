import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private readonly dataModel: Model<BlogDocument>) {
  }

  async create(createBlogDto: Blog) {
    createBlogDto.BlogDate = new Date();
    return await this.dataModel.create(createBlogDto);
  }

  async findAll() {
    return await this.dataModel.find().exec();
  }

  async findOne(id: string) {
    return await this.dataModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateBlogDto: Blog) {
    updateBlogDto.BlogDate = new Date();
    return await this.dataModel.findByIdAndUpdate({ _id: id }, updateBlogDto).exec();
  }

  async remove(id: string) {
    return await this.dataModel.findByIdAndRemove({ _id: id }).exec();
  }
}
