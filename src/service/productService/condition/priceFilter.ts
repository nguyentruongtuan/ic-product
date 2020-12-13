import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { SelectQueryBuilder } from "typeorm";
import { ProductCondition } from "../productCondition";

export class PriceFilter extends ProductCondition {
  apply(
    request: GetProductRequest,
    query: SelectQueryBuilder<Product>,
  ): SelectQueryBuilder<Product> {
    if (request.minPrice) {
      query.andWhere(`product.price >= ${request.minPrice}`);
    }

    if (request.maxPrice) {
      query.andWhere(`product.price <= ${request.maxPrice}`);
    }

    return query;
  }
}
