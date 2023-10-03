//class Money
import { Column } from 'typeorm'

export class Money {
    @Column()
    amount!: number; // fara undefined da eroare

    @Column({
        type: "integer",
        length: 3
    })
    currency!: string;
}
