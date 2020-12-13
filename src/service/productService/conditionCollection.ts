import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { SelectQueryBuilder } from "typeorm";
import { ProductCondition } from "./productCondition";

export class ConditionCollection extends ProductCondition {
  private filters: Array<ProductCondition>;

  constructor() {
    super();
    this.filters = [];
  }

  addCondition(filter: ProductCondition) {
    this.filters.push(filter);
    return this;
  }

  removeCondition(filter: ProductCondition) {
    const index = this.filters.indexOf(filter);
    this.filters.splice(index, 1);
    return this;
  }

  apply(
    request: GetProductRequest,
    query: SelectQueryBuilder<Product>,
  ): SelectQueryBuilder<Product> {
    this.filters.forEach((filter) => {
      filter.apply(request, query);
    });

    return query;
  }
}
