import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IPosition {
    category: string,
    level: string,
    company: string,
    description?: string,
    japaneseRequired: boolean
}

@Entity('Positions', { database: 'japanese_jobs_placeholder' })

export class Position extends CommonFields implements IPosition {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        category: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        level: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        company: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        description?: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false,
    })
        japaneseRequired: boolean;
}
