import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './schema/blog.schema';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post()
  async create(@Body() createBlogDto: Blog) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  async findAll() {
    const returnData = await this.blogsService.findAll();
    if(!returnData){
      throw new HttpException('No data found', HttpStatus.NOT_FOUND);
    }
    return returnData;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const returnData = await this.blogsService.findOne(id);
    if(!returnData){
      throw new HttpException(id + 'No data found', HttpStatus.NOT_FOUND);
    }
    return returnData;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: Blog) {
    const returnData = await this.blogsService.update(id, updateBlogDto);
    if(!returnData){
      throw new HttpException('No data found', HttpStatus.NOT_FOUND);
    }
    return returnData;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
