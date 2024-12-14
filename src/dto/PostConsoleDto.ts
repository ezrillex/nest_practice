import { IsString, IsInt } from 'class-validator';

export class PostConsoleDto {
  @IsString()
  name: string;

  @IsInt()
  release_year: number;
}
