import { EntityRepository, getManager, Repository } from 'typeorm';

import { Applicant, IApplicant, Category } from '../entity';
import { IApplicantToSet } from '../interfaces';

@EntityRepository(Applicant)
class ApplicantService extends Repository<Applicant> {
    public async createApl(applicant: IApplicant):Promise<void> {
        const savedApplicant = await getManager()
            .getRepository(Applicant)
            .save(applicant);

        const { id, categories } = savedApplicant;

        categories.forEach((category) => getManager().getRepository(Category)
            .save({ applicantId: id, category }));
    }

    public async fullUpdateApl(id:number, applicant:IApplicantToSet):Promise<void> {
        await getManager()
            .getRepository(Category).delete({ applicantId: id });

        applicant.categories?.forEach((category) => getManager().getRepository(Category)
            .save({ applicantId: id, category }));
        delete applicant.categories;
        await getManager()
            .getRepository(Applicant)
            .update(id, applicant);
    }

    public async deleteApl(id:number):Promise<void> {
        await getManager().getRepository(Applicant).delete(id);
    }
}

export const applicantService = new ApplicantService();
