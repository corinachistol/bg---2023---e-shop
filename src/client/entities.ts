import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

class Name{
    @Column()
    first!:string

    @Column()
    last!:string
}


@Entity()
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @Column(()=>Name)
    name!:Name

    @Column()
    address!:string

    @Column()
    phone!: number

    @Column({unique: true})
    email!: string

    @Column({length:8})
    password!:string

}