import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getAllProducts(): Array<any> {
    return [
      {
        id: 1,
        name: "P1",
      },
      {
        id: 2,
        name: "P2",
      },
    ];
  }
}
