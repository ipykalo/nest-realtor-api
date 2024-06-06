import { PropertyType } from '../enums/property-type.enum';

export interface FilterHomes {
  city?: string;
  maxPrice?: number;
  minPrice?: number;
  propertyType?: PropertyType;
}
