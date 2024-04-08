import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authAdminMiddlewares.js';
import { createKelasController, deleteDataKelasController, getKelasController, getSingleDataKelas, updateDataKelasController } from '../controllers/kelasController.js';

const router = express.Router();

//add
router.post('/create', requireSignIn, isAdmin, createKelasController);
//get all
router.get('/get-kelas', getKelasController);
//update & delete
router.put('/update/:kid', requireSignIn, updateDataKelasController);
router.delete('/delete/:kid', requireSignIn, deleteDataKelasController);
//get single
router.get('/get/:kid', getSingleDataKelas);

export default router;
