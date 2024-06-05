import { SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export function ResponseDto<T>(dto: ClassConstructor<T>) {
  return SetMetadata('DTO', dto);
}
