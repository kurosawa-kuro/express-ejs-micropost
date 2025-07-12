import { Router } from 'express';
import * as micropostController from '../../controllers/micropost.controller.js';

const router = Router();

router.get('/', micropostController.getAllMicroposts);
router.get('/:id', micropostController.getMicropostById);
router.post('/', micropostController.createMicropost);
router.put('/:id', micropostController.updateMicropost);
router.delete('/:id', micropostController.deleteMicropost);

export default router;