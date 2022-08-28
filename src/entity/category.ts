import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { Applicant } from './applicant';

export interface ICategory {
    applicantId: number,
    category: string
}

@Entity('Categories', { database: 'japanese_jobs_placeholder' })

export class Category extends CommonFields implements ICategory {
    @Column({
        type: 'integer',
        nullable: false,
    })
        applicantId: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        category: string;

    @ManyToOne(() => Applicant, (applicant) => applicant.categories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'applicantId' })
        applicant:Applicant;
}
