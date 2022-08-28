import {
    Column, Entity, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { Category } from './category';

export interface IApplicant {
    email: string,
    japaneseKnowledge: boolean,
    level: string,
    categories: string[]
}

@Entity('Applicants', { database: 'japanese_jobs_placeholder' })

export class Applicant extends CommonFields implements IApplicant {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        email: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false,
    })
        japaneseKnowledge: boolean;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        level: string;

    @OneToMany(() => Category, (category) => category.applicant, { cascade: true })
        categories: string[];
}
