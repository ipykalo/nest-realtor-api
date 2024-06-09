import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dtos/home-response.dto';
import { CreateHomeRequestDto } from './dtos/create-home-request.dto';
import { Public, ResponseDto } from 'src/shared';
import { PropertyType } from './enums/property-type.enum';
import { UpdateHomeRequestDto } from './dtos/update-home-request.dto';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Public()
  @ResponseDto(HomeResponseDto)
  @Get()
  getHomes(
    @Query('city') city: string,
    @Query('maxPrice') maxPrice: number,
    @Query('minPrice') minPrice: number,
    @Query('propertyType') propertyType: PropertyType,
  ): Promise<HomeResponseDto[]> {
    return this.homeService.getHomes({
      city,
      maxPrice: +maxPrice,
      minPrice: +minPrice,
      propertyType,
    });
  }

  @Public()
  @ResponseDto(HomeResponseDto)
  @Get(':id')
  getHome(@Param('id') id: string): Promise<HomeResponseDto> {
    return this.homeService.getHome(id);
  }

  @Public()
  @ResponseDto(HomeResponseDto)
  @Post()
  create(@Body() dto: CreateHomeRequestDto): Promise<HomeResponseDto> {
    return this.homeService.create(dto);
  }

  @Public()
  @ResponseDto(HomeResponseDto)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHomeRequestDto,
  ): Promise<HomeResponseDto> {
    return this.homeService.update(id, dto);
  }

  @Public()
  @ResponseDto(HomeResponseDto)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<HomeResponseDto> {
    return this.homeService.delete(id);
  }
}
