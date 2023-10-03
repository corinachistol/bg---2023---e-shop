// class product
import { Entity,PrimaryGeneratedColumn, Column } from "typeorm";
import { Money } from "../financial/entitites.js";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column( () => Money )
    public price!: Money;
}