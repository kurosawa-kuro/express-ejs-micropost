import { Router } from 'express';
import * as micropostCtrl from '../../viewControllers/micropost.viewController.js';

const router = Router();

router.get('/', micropostCtrl.index);
router.get('/microposts/new', micropostCtrl.newForm);
router.post('/microposts', micropostCtrl.create);
router.get('/microposts/:id', micropostCtrl.show);
router.get('/microposts/:id/edit', micropostCtrl.editForm);
router.post('/microposts/:id', micropostCtrl.update);
router.post('/microposts/:id/delete', micropostCtrl.destroy);

export default router;