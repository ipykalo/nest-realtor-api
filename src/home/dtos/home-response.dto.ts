import { Exclude, Expose } from 'class-transformer';
import { PropertyType } from '../enums/property-type.enum';
import { Home, Image } from '../interfaces/home.intreface';

export class HomeResponseDto implements Home {
  @Expose()
  _id: string;

  @Expose()
  address: string;

  @Expose()
  bedrooms: number;

  @Expose()
  bathrooms: number;

  @Expose()
  city: string;

  @Expose()
  price: number;

  @Expose()
  landSize: number;

  @Expose()
  propertyType: PropertyType;

  @Expose()
  image: Image[];

  @Exclude()
  createTs: Date;

  @Exclude()
  updateTs: Date;

  @Exclude()
  realtorId: string;

  constructor(dto: Partial<HomeResponseDto>) {
    Object.assign(this, dto);
  }
}
