import { comparePassword, hashPassword } from '../helpers/authAdminHelpers.js';
import adminModel from '../models/adminModel.js';
import JWT from 'jsonwebtoken';

//register admin
export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi
    if (!username || !password) {
      return res.status(400).send({ message: 'Username and password are required' });
    }

    // Periksa admin yang ada
    const existingAdminUser = await adminModel.findOne({ username });

    // Admin sudah ada
    if (existingAdminUser) {
      return res.status(200).send({
        success: false,
        message: 'Already registered, please login',
      });
    }

    // Daftarkan admin
    const hashedPassword = await hashPassword(password);

    // Simpan data admin
    const admin = await new adminModel({
      username,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: 'Admin registered successfully',
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in registering admin',
      error,
    });
  }
};

// login
export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validations
    if (!username || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid username or password',
      });
    }

    //check user admin
    const admin = await adminModel.findOne({ username });
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: 'Username is not registered',
      });
    }

    const match = await comparePassword(password, admin.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid password',
      });
    }

    //token
    const token = await JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).send({
      success: true,
      message: 'Login success',
      admin: {
        username: admin.username,
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
