import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface ICommonFields {
    id: number,
    createdAt: string
}

export class CommonFields implements ICommonFields {
    @PrimaryGeneratedColumn()
        id: number;

    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;
}
