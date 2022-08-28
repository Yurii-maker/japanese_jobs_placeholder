import { Router } from 'express';

import { positionRouter } from './positionRouter';
import { applicantRouter } from './applicantRouter';

const router = Router();

router.use('/positions', positionRouter);
router.use('/applicants', applicantRouter);

export const apiRouter = router;
