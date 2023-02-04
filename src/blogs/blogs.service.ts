import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProducerService } from 'src/kafka/producer.service';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly dataModel: Model<BlogDocument>,
    private readonly producerService: ProducerService
    ) {
  }

  async create(createBlogDto: Blog) {
    createBlogDto.BlogDate = new Date();
    this.producerService.produce({
      topic: process.env.KAFKA_TOPIC,
      messages: [{
        value: Buffer.from(JSON.stringify({status: 'create', data: createBlogDto}))
      }]
    });
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
    this.producerService.produce({
      topic: process.env.KAFKA_TOPIC,
      messages: [{
        value: Buffer.from(JSON.stringify({status: 'update', data: updateBlogDto}))
      }]
    });
    return this.dataModel.findByIdAndUpdate({ _id: id }, updateBlogDto).exec();
  }

  remove(id: string) {
    this.producerService.produce({
      topic: process.env.KAFKA_TOPIC,
      messages: [{
        value: Buffer.from(JSON.stringify({status: 'delete', data: id}))
      }]
    });
    return this.dataModel.findByIdAndRemove({ _id: id }).exec();
  }
}
