import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductService } from "./service/productService";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ProductService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("getProducts", () => {
    it("should return array of products", () => {});
  });
});
