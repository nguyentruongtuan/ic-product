import { Product } from "src/entity/product.entity";
import { GetProductRequest } from "src/model/getProductRequest";
import { Brackets, SelectQueryBuilder } from "typeorm";
import { ProductCondition } from "../productCondition";

export class BranchFilter extends ProductCondition {
  apply(
    request: GetProductRequest,
    query: SelectQueryBuilder<Product>,
  ): SelectQueryBuilder<Product> {
    console.log(request.branch);
    if (request.branch) {
      query.andWhere(
        new Brackets((ob) => {
          request.branch.forEach((element) => {
            ob.orWhere(`product.branch = '${element}'`);
          });
        }),
      );
    }

    return query;
  }
}
