import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductService } from "./service/productService";
import configuration from "./config/configuration";
import { databaseProvider } from "./provider/database.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import {
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Product],
      synchronize: true,
      insecureAuth: true,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    {
      provide: "LOGGER_SERVICE",
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${process.env.RMQ_ENDPOINT}:${process.env.RMQ_PORT}`,
            ],
            queue: "logger_queue"
          },
        });
      },
    },
  ],
})
export class AppModule {}
