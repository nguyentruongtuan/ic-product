import { GetProductRequest } from "src/model/getProductRequest";

export abstract class ProductFilter {
  protected parent: ProductFilter;

  addFilter(filter: ProductFilter): void {}

  removeFilter(filter: ProductFilter): void {}

  setParent(parent: ProductFilter) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  abstract apply(request: GetProductRequest, query: Array<any>): Array<any>;
}
