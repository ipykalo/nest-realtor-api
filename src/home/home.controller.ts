import { Controller, Get, Post } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  getHomes() {
    return this.homeService.getHomes();
  }

  @Post()
  create() {
    return this.homeService.create();
  }
}
