import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { Repository } from "typeorm";
import { BranchFilter } from "./productService/condition/branchFilter";
import { NameFilter } from "./productService/condition/nameFilter";
import { PriceFilter } from "./productService/condition/priceFilter";
import { SortByCondition } from "./productService/condition/sortBy";
import { ConditionCollection } from "./productService/conditionCollection";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject("LOGGER_SERVICE") private readonly loggerService: ClientProxy,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getByFilter(request: GetProductRequest): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder("product");

    const filterCollection = new ConditionCollection();
    filterCollection.addCondition(new BranchFilter());
    filterCollection.addCondition(new NameFilter());
    filterCollection.addCondition(new PriceFilter());
    filterCollection.addCondition(new SortByCondition());
    filterCollection.apply(request, queryBuilder);

    const result = await queryBuilder.getMany();

    await this.loggerService.send("GET_PRODUCT_SUCCESS", { result });

    return result;
  }

  getById(id: number) {
    return this.productRepository.findOne({ id: id });
  }

  createProduct(product: Product) {
    return this.productRepository.save(product);
  }
}
