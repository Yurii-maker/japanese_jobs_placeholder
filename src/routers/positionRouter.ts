import { Router } from 'express';

import { positionController } from '../controllers';

const router = Router();

router.get('/', positionController.getAllPositions);
router.get('/:id', positionController.getPosition);
router.post('/', positionController.createPosition);
router.patch('/:id', positionController.updatePosition);
router.delete('/:id', positionController.deletePosition);
export const positionRouter = router;
