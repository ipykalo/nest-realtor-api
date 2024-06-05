import { PropertyType } from '../enums/property-type.enum';

export interface Image {
  url: string;
}

export interface Home {
  _id?: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  city: string;
  price: number;
  landSize: number;
  propertyType: PropertyType;
  image: Image[];
  createTs: Date;
  updateTs: Date;
  realtorId: string;
}
