import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authAdminMiddlewares.js';
import { createJurusanController, deleteDataJurusanController, getJurusanController, getSingleDataJurusan, updateDataJurusanController } from '../controllers/jurusanController.js';

const router = express.Router();

//add
router.post('/create', requireSignIn, isAdmin, createJurusanController);
//get all
router.get('/get-jurusan', getJurusanController);
//update & delete
router.put('/update/:jid', requireSignIn, updateDataJurusanController);
router.delete('/delete/:jid', requireSignIn, deleteDataJurusanController);
//get single
router.get('/get/:jid', getSingleDataJurusan);

export default router;
