import { IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, Index, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  @MinLength(3)
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  color: string;

  @Column()
  branch: string;

  @Index()
  @Column({ default: true })
  isActive: boolean;
}
