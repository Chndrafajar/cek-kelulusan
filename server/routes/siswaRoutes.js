import express from 'express';
import { requireSignIn } from '../middlewares/authAdminMiddlewares.js';
import {
  addDataSiswaController,
  deleteDataSiswaController,
  getAllDataSiswa,
  getSingleDataSiswa,
  loginSiswaController,
  searchSiswaController,
  siswaJurusanController,
  siswaKelasController,
  updateDataSiswaController,
} from '../controllers/siswaController.js';

const router = express.Router();

//add data siswa
router.post('/tambah', requireSignIn, addDataSiswaController);
router.post('/login', loginSiswaController);
//update data siswa
router.put('/update/:sid', requireSignIn, updateDataSiswaController);
//delete data siswa
router.delete('/delete/:sid', requireSignIn, deleteDataSiswaController);
//get data siswa
router.get('/get-data', requireSignIn, getAllDataSiswa);
router.get('/get/:sid', getSingleDataSiswa);
router.get('/get-jurusan/:slug', siswaJurusanController);
router.get('/get-kelas/:slug', siswaKelasController);
router.get('/search/:keyword', searchSiswaController);

//protected User route auth
router.get('/siswa-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
