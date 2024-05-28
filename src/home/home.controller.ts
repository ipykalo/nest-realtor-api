import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dtos/home-response.dto';
import { HomeRequestDto } from './dtos/home-request.dto';
import { Public } from 'src/shared';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Public()
  @Get()
  getHomes(): Promise<HomeResponseDto[]> {
    return this.homeService.getHomes();
  }

  @Public()
  @Get(':id')
  getHome(@Param('id') id: string): Promise<HomeResponseDto> {
    return this.homeService.getHome(id);
  }

  @Public()
  @Post()
  create(@Body() dto: HomeRequestDto): Promise<HomeResponseDto> {
    return this.homeService.create(dto);
  }

  @Public()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: HomeRequestDto,
  ): Promise<HomeResponseDto> {
    return this.homeService.update(id, dto);
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: string): Promise<HomeResponseDto> {
    return this.homeService.delete(id);
  }
}
