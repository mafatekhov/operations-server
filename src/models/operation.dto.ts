import { IsNotEmpty, IsString } from "class-validator"

export class CreateOperationDto {
  @IsNotEmpty()
  @IsString()
  name: string
}