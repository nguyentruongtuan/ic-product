export class GetProductRequest {
  constructor(public readonly branch: Array<string>) {
    GetProductRequest.validate(this);
  }

  static validate(request: GetProductRequest) {
    if (!Array.isArray(request.branch)) {
      throw new Error("Invalid branch");
    }
  }
}
