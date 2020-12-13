import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { SelectQueryBuilder } from "typeorm";

export abstract class ProductCondition {
  protected parent: ProductCondition;

  addCondition(filter: ProductCondition): void {}

  removeCondition(filter: ProductCondition): void {}

  setParent(parent: ProductCondition) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  abstract apply(
    request: GetProductRequest,
    query: SelectQueryBuilder<Product>,
  ): SelectQueryBuilder<Product>;
}
