import JWT from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';

//protected token routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.admin = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const admin = await adminModel.findById(req.admin._id);
    if (admin.username !== 'admin') {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: 'Error in Admin Middlewares',
    });
  }
};
