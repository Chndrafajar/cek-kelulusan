import jurusanModel from '../models/jurusanModel.js';
import kelasModel from '../models/kelasModel.js';
import siswaModel from '../models/siswaModel.js';
import JWT from 'jsonwebtoken';

export const addDataSiswaController = async (req, res) => {
  try {
    const { nama, nis, jeniskelamin, sekolah, status, tgllahir, kelas, jurusan } = req.body;

    //validations
    if (!nama) {
      return res.send({ message: 'Nama is required' });
    }
    if (!jeniskelamin) {
      return res.send({ message: 'Jenis Kelamin is required' });
    }
    if (!sekolah) {
      return res.send({ message: 'Jenis Kelamin is required' });
    }
    if (!nis) {
      return res.send({ message: 'NIS is required' });
    }
    if (!status) {
      return res.send({ message: 'Status is required' });
    }
    if (!tgllahir) {
      return res.send({ message: 'Tanggal Lahir is required' });
    }
    if (!kelas) {
      return res.send({ message: 'Kelas is required' });
    }
    if (!jurusan) {
      return res.send({ message: 'Jurusan is required' });
    }

    //check siswa
    const existingSiswa = await siswaModel.findOne({ nama });

    //existingSiswa
    if (existingSiswa) {
      return res.status(200).send({
        success: false,
        message: 'Already register please login',
      });
    }

    const siswa = await new siswaModel({
      nama,
      nis,
      status,
      tgllahir,
      kelas,
      jurusan,
      sekolah,
      jeniskelamin,
    }).save();
    res.status(201).send({
      success: true,
      message: 'Add Data siswa Successfully',
      siswa,
    });
  } catch (error) {
    console.log(error);
  }
};

//login siswa
export const loginSiswaController = async (req, res) => {
  try {
    const { nis } = req.body;

    //validations
    if (!nis) {
      return res.status(404).send({
        success: false,
        message: 'Invalid nama or nis',
      });
    }

    //check user admin
    const siswa = await siswaModel.findOne({ nis }).populate('kelas jurusan');
    if (!siswa) {
      return res.status(404).send({
        success: false,
        message: 'nama is not registered',
      });
    }

    //token
    const token = await JWT.sign({ _id: siswa._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).send({
      success: true,
      message: 'Login success',
      siswa: {
        nama: siswa.nama,
        nis: siswa.nis,
        status: siswa.status,
        tgllahir: siswa.tgllahir,
        kelas: siswa.kelas,
        jurusan: siswa.jurusan,
        sekolah: siswa.sekolah,
        jeniskelamin: siswa.jeniskelamin,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

export const updateDataSiswaController = async (req, res) => {
  try {
    const { nama, nis, jeniskelamin, sekolah, status, tgllahir, kelas, jurusan } = req.body;

    switch (true) {
      case !nama:
        return res.status(500).send({
          error: 'nama is required',
        });
      case !nis:
        return res.status(500).send({
          error: 'nis is required',
        });
      case !jeniskelamin:
        return res.status(500).send({
          error: 'jeniskelamin is required',
        });
      case !sekolah:
        return res.status(500).send({
          error: 'sekolah is required',
        });
      case !tgllahir:
        return res.status(500).send({
          error: 'tanggal lahir is required',
        });
      case !kelas:
        return res.status(500).send({
          error: 'kelas is required',
        });
      case !jurusan:
        return res.status(500).send({
          error: 'jurusan lahir is required',
        });
      case !status:
        return res.status(500).send({
          error: 'status is required',
        });
    }

    const siswa = await siswaModel.findByIdAndUpdate(req.params.sid, { ...req.body }, { new: true });
    await siswa.save();
    res.status(200).send({
      success: true,
      message: 'Data Siswa updated successfully',
      siswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while update data siswa',
      error,
    });
  }
};

export const deleteDataSiswaController = async (req, res) => {
  try {
    await siswaModel.findByIdAndDelete(req.params.sid);
    res.status(200).send({
      success: true,
      message: 'Data Siswa deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while delete data siswa',
      error,
    });
  }
};

export const getAllDataSiswa = async (req, res) => {
  try {
    const siswa = await siswaModel.find({}).populate('kelas jurusan');
    res.json(siswa);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while getting data siswa',
      error,
    });
  }
};

export const getSingleDataSiswa = async (req, res) => {
  try {
    const siswa = await siswaModel.findById(req.params.sid);
    res.status(200).send({
      success: true,
      message: 'Single data siswa fetched',
      siswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get single data siswa',
    });
  }
};

//get siswa jurusan
export const siswaJurusanController = async (req, res) => {
  try {
    const jurusan = await jurusanModel.findOne({
      slug: req.params.slug,
    });

    const siswa = await siswaModel.find({ jurusan }).populate('jurusan kelas');
    res.status(200).send({
      success: true,
      jurusan,
      siswa,
    });
  } catch (error) {
    console.error('Error in fetching data siswa:', error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in fetching data siswa',
    });
  }
};
//get siswa kelas
export const siswaKelasController = async (req, res) => {
  try {
    const kelas = await kelasModel.findOne({
      slug: req.params.slug,
    });

    const siswa = await siswaModel.find({ kelas }).populate('kelas jurusan');
    res.status(200).send({
      success: true,
      kelas,
      siswa,
    });
  } catch (error) {
    console.error('Error in fetching data siswa:', error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in fetching data siswa',
    });
  }
};

//get siswa search
export const searchSiswaController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await siswaModel
      .find({
        $or: [{ nama: { $regex: keyword, $options: 'i' } }, { nis: { $regex: keyword, $options: 'i' } }],
      })
      .populate('kelas jurusan');
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error in search siswa api',
      error,
    });
  }
};
