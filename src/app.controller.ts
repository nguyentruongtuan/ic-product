import { Controller, Inject, Injectable } from "@nestjs/common";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { Product } from "./entity/product.entity";
import { GetProductRequest } from "./model/getProductRequest";
import { ProductService } from "./service/productService";

@Controller()
@Injectable()
export class AppController {
  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject("LOGGER_SERVICE") private readonly loggerService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: "getProducts" })
  async getProducts(request: GetProductRequest): Promise<Product[]> {
    try {
      const result = await this.productService.getByFilter(request);
      await this.loggerService
        .send<string>({ cmd: "GET_PRODUCT_SUCCESS" }, result)
        .toPromise();
      return result;
    } catch (error) {
      await this.loggerService
        .send<string>({ cmd: "GET_PRODUCT_SUCCESS" }, error)
        .toPromise();
    }
  }

  @MessagePattern({ cmd: "getProduct" })
  getProduct(id: number): Promise<any> {
    return this.productService.getById(id);
  }
}
