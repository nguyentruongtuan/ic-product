import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { Repository } from "typeorm";
import { BranchFilter } from "./productService/condition/branchFilter";
import { NameFilter } from "./productService/condition/nameFilter";
import { PriceFilter } from "./productService/condition/priceFilter";
import { SortByCondition } from "./productService/condition/sortBy";
import { ConditionCollection } from "./productService/conditionCollection";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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

    return queryBuilder.getMany();
  }

  getById(id: number) {
    return this.productRepository.findOne({ id: id });
  }

  createProduct(product: Product) {
    return this.productRepository.save(product);
  }
}
