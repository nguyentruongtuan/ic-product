import { IsArray, IsNumberString, IsOptional } from "class-validator";

export class GetProductRequest {
  @IsArray()
  @IsOptional()
  branch: Array<string>;

  @IsOptional()
  name: string;

  @IsNumberString()
  minPrice: number;

  @IsNumberString()
  maxPrice: number;

  sortBy: string;

  sortDirection: "ASC" | "DESC";
}
