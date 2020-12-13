import { Controller, Inject, Injectable } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { GetProductRequest } from "./model/getProductRequest";
import { ProductService } from "./service/productService";

@Controller()
@Injectable()
export class AppController {
  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  @MessagePattern({ cmd: "getProducts" })
  getProducts(request: GetProductRequest): Promise<any> {
    return this.productService.getByFilter(request);
  }

  @MessagePattern({ cmd: "getProduct" })
  getProduct(id: number): Promise<any> {
    return this.productService.getById(id);
  }
}
