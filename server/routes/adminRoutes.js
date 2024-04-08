import express from 'express';
import { loginController, registerController } from '../controllers/adminController.js';
import { isAdmin, requireSignIn } from '../middlewares/authAdminMiddlewares.js';

const router = express.Router();

//register admin
router.post('/register', requireSignIn, registerController);

//login admin
router.post('/login', loginController);

//protected User route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ oke: true });
});

export default router;
