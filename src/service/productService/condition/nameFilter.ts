import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { Brackets, Like, SelectQueryBuilder } from "typeorm";
import { ProductCondition } from "../productCondition";

export class NameFilter extends ProductCondition {
  apply(
    request: GetProductRequest,
    query: SelectQueryBuilder<Product>,
  ): SelectQueryBuilder<Product> {
    if (request.name) {
      const keyword = query.escape(request.name);
      query.andWhere(`MATCH(name) AGAINST('${keyword}' IN BOOLEAN MODE)`);
    }

    return query;
  }
}
