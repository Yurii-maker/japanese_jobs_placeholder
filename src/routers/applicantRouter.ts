import { Router } from 'express';

import { applicantController } from '../controllers';

const router = Router();

router.post('/', applicantController.saveApl);
router.put('/:id', applicantController.fullUpdateApl);
router.delete('/:id', applicantController.deleteApl);

export const applicantRouter = router;
