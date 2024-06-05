import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { PropertyType } from '../enums/property-type.enum';
import { Home, Image } from '../interfaces/home.intreface';

type CreateHome = Omit<Home, 'createTs' | 'updateTs' | 'realtorId'>;

export class ImageDto implements Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class HomeRequestDto implements CreateHome {
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

  @IsArray({ each: true })
  image: ImageDto[];
}
