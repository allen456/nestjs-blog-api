import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getSites(): string {
    return 'This is a API can be accessed below:<br>https://nextjs-blog-alen456.vercel.app/<br>https://reactjs-blog-alen456.vercel.app/<br>https://aspnetmvc-blog.onrender.com/';
  }
}
