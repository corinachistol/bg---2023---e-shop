//class Money
import { Column } from 'typeorm'

export class Money {
    @Column({type:"numeric"})
    amount!: number; 

    @Column()
    currency!: string;
}
