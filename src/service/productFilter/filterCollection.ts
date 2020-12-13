import { GetProductRequest } from "src/model/getProductRequest";
import { ProductFilter } from "./productFilter";

export class FilterCollection extends ProductFilter {
  private filters: Array<ProductFilter>;

  constructor() {
    super();
    this.filters = [];
  }

  addFilter(filter: ProductFilter) {
    this.filters.push(filter);
    return this;
  }

  removeFilter(filter: ProductFilter) {
    const index = this.filters.indexOf(filter);
    this.filters.splice(index, 1);
    return this;
  }

  apply(request: GetProductRequest, query: Array<any>): Array<any> {
    this.filters.forEach((filter) => {
      filter.apply(request, query);
    });

    return query;
  }
}
