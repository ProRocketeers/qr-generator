import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateQrDto {
  @IsString()
  data!: string;

  @IsOptional()
  @IsIn(['image', 'base64'])
  output?: 'image' | 'base64';
}