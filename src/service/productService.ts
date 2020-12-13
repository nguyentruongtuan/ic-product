import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { Repository } from "typeorm";
import { BranchFilter } from "./productFilter/filter/branchFilter";
import { FilterCollection } from "./productFilter/filterCollection";

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
    const filterCollection = new FilterCollection();
    filterCollection.addFilter(new BranchFilter());
    const conditions = filterCollection.apply(request, []);
    return this.productRepository.find({
      where: conditions,
    });
  }

  getById(id: number) {
    return this.productRepository.findOne({ id: id });
  }

  createProduct(product: Product) {
    return this.productRepository.save(product);
  }
}
