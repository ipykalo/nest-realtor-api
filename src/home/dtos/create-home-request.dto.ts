import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PropertyType } from '../enums/property-type.enum';
import { Home } from '../interfaces/home.intreface';
import { Type } from 'class-transformer';
import { ImageHomeRequestDto } from './image-home-request.dto';

type CreateHome = Omit<Home, 'createTs' | 'updateTs' | 'realtorId'>;

export class CreateHomeRequestDto implements CreateHome {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  bedrooms: number;

  @IsNumber()
  @IsPositive()
  bathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  landSize: number;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  propertyType: PropertyType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageHomeRequestDto)
  image: ImageHomeRequestDto[];
}
