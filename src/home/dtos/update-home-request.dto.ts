import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PropertyType } from '../enums/property-type.enum';
import { Home } from '../interfaces/home.intreface';
import { Type } from 'class-transformer';
import { ImageHomeRequestDto } from './image-home-request.dto';

type UpdateHome = Partial<Home>;

export class UpdateHomeRequestDto implements UpdateHome {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  bedrooms?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  bathrooms?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  landSize?: number;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  @IsOptional()
  propertyType?: PropertyType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageHomeRequestDto)
  @IsOptional()
  image?: ImageHomeRequestDto[];
}
