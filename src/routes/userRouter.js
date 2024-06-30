import { Router } from 'express';
import { registerUsers } from '../controllers/userControllers.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = Router();

router.route('/register').post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUsers
);

export default router;
