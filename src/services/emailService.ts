import nodemailer, { SentMessageInfo } from 'nodemailer';
import { getManager } from 'typeorm';

import { config } from '../config';
import {
    Applicant, IApplicant, Category, Position,
} from '../entity';

class EmailService {
    public sendMail(userMail:string, theme:string, message:string):Promise<SentMessageInfo> {
        const emailTransporter = nodemailer.createTransport({
            from: 'japanese_jobs_API',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_PASSWORD,
            },
        });
        return emailTransporter.sendMail({
            to: userMail,
            subject: theme,
            text: message,
        });
    }

    public autoMailSending(
        applicants:IApplicant[],
        subject:string,
        message:string,
    ):void {
        applicants.forEach((applicant) => this.sendMail(
            applicant.email,
            subject,
            message,
        ));
    }

    public async mailSendingNewPosition(
        category:string,
        level:string,
        japaneseRequired:boolean,
        subject:string,
        messageWithoutJapanese:string,
        messageWithJapanese:string,
    ):Promise<IApplicant[]|undefined> {
        let filteredApplicants = await getManager().getRepository(Applicant).find({
            where: { level },
        });
        const filteredCategories = await getManager().getRepository(Category).find({
            where: { category },
        });

        if (japaneseRequired) {
            filteredApplicants = filteredApplicants
                .filter((applicant) => applicant.japaneseKnowledge
        && filteredCategories.find((ctgr) => ctgr.applicantId === applicant.id));
            this.autoMailSending(
                filteredApplicants,
                subject,
                messageWithJapanese,
            );
            return;
        }
        filteredApplicants = filteredApplicants.filter((user) => filteredCategories
            .find((ctgr) => ctgr.applicantId === user.id));
        this.autoMailSending(
            filteredApplicants,
            subject,
            messageWithoutJapanese,
        );
    }

    public async mailSendingRemovePosition(
        positionId:number,
        subject:string,
        messageWithoutJapanese: Function,
        messageWithJapanese: Function,
    ):Promise<void> {
        const positionToRemove = await getManager()
            .getRepository(Position).findOne({ where: { id: positionId } });
        if (positionToRemove) {
            const { category, level, japaneseRequired } = positionToRemove;
            await this.mailSendingNewPosition(
                category,
                level,
                japaneseRequired,
                subject,
                messageWithoutJapanese(category, level),
                messageWithJapanese(category, level),
            );
        }
    }
}
export const emailService = new EmailService();
