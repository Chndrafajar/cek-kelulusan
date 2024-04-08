import jurusanModel from '../models/jurusanModel.js';
import slugify from 'slugify';

//add
export const createJurusanController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: 'Name is required',
      });
    }

    const existingJurusan = await jurusanModel.findOne({ name });
    if (existingJurusan) {
      return res.status(200).send({
        success: true,
        message: 'jurusan already exisits',
      });
    }

    const jurusan = await jurusanModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: 'jurusan created succesfully',
      jurusan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in jurusan',
    });
  }
};

//get all
export const getJurusanController = async (req, res) => {
  try {
    const jurusan = await jurusanModel.find({});
    res.status(200).send({
      success: true,
      message: 'All jurusan list',
      jurusan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in jurusan',
    });
  }
};

//update jurusan
export const updateDataJurusanController = async (req, res) => {
  try {
    const { name } = req.body;

    switch (true) {
      case !name:
        return res.status(500).send({
          error: 'name is required',
        });
    }

    const jurusan = await jurusanModel.findByIdAndUpdate(req.params.jid, { ...req.body }, { new: true });
    await jurusan.save();
    res.status(200).send({
      success: true,
      message: 'Data jurusan updated successfully',
      jurusan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while update data jurusan',
      error,
    });
  }
};

//delete
export const deleteDataJurusanController = async (req, res) => {
  try {
    await jurusanModel.findByIdAndDelete(req.params.jid);
    res.status(200).send({
      success: true,
      message: 'Data jurusan deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while delete data jurusan',
      error,
    });
  }
};

//get single jurusan
export const getSingleDataJurusan = async (req, res) => {
  try {
    const jurusan = await jurusanModel.findById(req.params.jid);
    res.status(200).send({
      success: true,
      message: 'Single data jurusan fetched',
      jurusan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get single data jurusan',
    });
  }
};
