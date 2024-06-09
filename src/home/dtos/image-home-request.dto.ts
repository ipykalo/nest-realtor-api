import { IsNotEmpty, IsString } from 'class-validator';
import { Image } from '../interfaces/home.intreface';

export class ImageHomeRequestDto implements Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}
