import { GetProductRequest } from "src/model/getProductRequest";
import { ProductFilter } from "../productFilter";

export class BranchFilter extends ProductFilter {
  apply(request: GetProductRequest, query: Array<any>): Array<any> {
    if (request.branch) {
      request.branch.forEach((element) => {
        query.push({ branch: element });
      });
    }

    return query;
  }
}
