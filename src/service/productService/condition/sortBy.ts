import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { SelectQueryBuilder } from "typeorm";
import { ProductCondition } from "../productCondition";

export class SortByCondition extends ProductCondition {
  apply(
    request: GetProductRequest,
    query: SelectQueryBuilder<Product>,
  ): SelectQueryBuilder<Product> {
    if (request.sortBy) {
      const order = request.sortDirection ? request.sortDirection : "ASC";
      query.orderBy(request.sortBy, order);
    }

    return query;
  }
}
