import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private readonly dataModel: Model<BlogDocument>) {
  }

  create(createBlogDto: Blog) {
    createBlogDto.BlogDate = new Date();
    return this.dataModel.create(createBlogDto);
  }

  findAll() {
    return this.dataModel.find().exec();
  }

  findOne(id: string) {
    return this.dataModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateBlogDto: Blog) {
    updateBlogDto.BlogDate = new Date();
    return this.dataModel.findByIdAndUpdate({ _id: id }, updateBlogDto).exec();
  }

  remove(id: string) {
    return this.dataModel.findByIdAndRemove({ _id: id }).exec();
  }
}
