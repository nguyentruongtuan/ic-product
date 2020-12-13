import { ConfigService } from "@nestjs/config";
import { createConnection } from "typeorm";

const configService = new ConfigService();
export const databaseProvider = [
  {
    provide: "DATABASE_PROVIDER",
    useFactory: async () =>
      await createConnection({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
  },
];
