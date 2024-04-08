import kelasModel from '../models/kelasModel.js';
import slugify from 'slugify';

//add
export const createKelasController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: 'Name is required',
      });
    }

    const existingKelas = await kelasModel.findOne({ name });
    if (existingKelas) {
      return res.status(200).send({
        success: true,
        message: 'kelas already exisits',
      });
    }

    const kelas = await kelasModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: 'kelas created succesfully',
      kelas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in kelas',
    });
  }
};

//get all
export const getKelasController = async (req, res) => {
  try {
    const kelas = await kelasModel.find({});
    res.status(200).send({
      success: true,
      message: 'All kelas list',
      kelas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in kelas',
    });
  }
};

//update kelas
export const updateDataKelasController = async (req, res) => {
  try {
    const { name } = req.body;

    switch (true) {
      case !name:
        return res.status(500).send({
          error: 'name is required',
        });
    }

    const kelas = await kelasModel.findByIdAndUpdate(req.params.kid, { ...req.body }, { new: true });
    await kelas.save();
    res.status(200).send({
      success: true,
      message: 'Data kelas updated successfully',
      kelas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while update data kelas',
      error,
    });
  }
};

//delete
//delete
export const deleteDataKelasController = async (req, res) => {
  try {
    await kelasModel.findByIdAndDelete(req.params.kid);
    res.status(200).send({
      success: true,
      message: 'Data kelas deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while delete data kelas',
      error,
    });
  }
};

//get single kelas
export const getSingleDataKelas = async (req, res) => {
  try {
    const kelas = await kelasModel.findById(req.params.kid);
    res.status(200).send({
      success: true,
      message: 'Single data kelas fetched',
      kelas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get single data kelas',
    });
  }
};
