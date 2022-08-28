import { Request, Response } from 'express';

import { applicantService } from '../services';

class ApplicantController {
    public async saveApl(req: Request, res: Response):Promise<Response|undefined> {
        try {
            await applicantService.createApl(req.body);
            return res.sendStatus(201);
        } catch (e) { console.error(e); }
    }

    public async fullUpdateApl(req: Request, res: Response):Promise<Response|undefined> {
        try {
            const { id } = req.params;
            await applicantService.fullUpdateApl(+id, req.body);
            return res.sendStatus(200);
        } catch (e) { console.error(e); }
    }

    public async deleteApl(req: Request, res: Response):Promise<Response|undefined> {
        try {
            const { id } = req.params;
            await applicantService.deleteApl(+id);
            return res.sendStatus(204);
        } catch (e) { console.error(e); }
    }
}

export const applicantController = new ApplicantController();
