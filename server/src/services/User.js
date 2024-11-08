import {
  createUserRepo,
  deleteUserRepo,
  getAllUsersRepo,
  getUserByEmailRepo,
  getUserByIdRepo,
  updateUserRepo,
} from "../repository/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/JWT.js";
export const createUserService = async (userObject) => {
  try {
    const existingUser = await getUserByEmailRepo(userObject.email);
    if (existingUser) {
      throw new Error({
        message: "User already exists",
        status: 400,
      });
    }
    const user = await createUserRepo(userObject);
    return user;
  } catch (error) {
    throw new Error({
      message: error.message,
      status: error.status,
    });
  }
};
class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export const signInService = async (userObject, res) => {
  try {
    const existingUser = await getUserByEmailRepo(userObject.email);
    if (!existingUser) {
      throw new CustomError("User does not exist", 400);
    }
    const validatePassword = await bcrypt.compare(
      userObject.password,
      existingUser.password
    );
    if (!validatePassword) {
      throw new CustomError("Incorrect password", 400);
    }
    const token = await generateToken({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
    });

    return { ...existingUser._doc, token };
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await getAllUsersRepo();
    return users;
  } catch (error) {
    throw new Error({
      message: error.message,
      status: error.status,
    });
  }
};

export const getUserByIdService = async (id) => {
  try {
    const user = await getUserByIdRepo(id);
    return user;
  } catch (error) {
    throw new Error({
      message: error.message,
      status: error.status,
    });
  }
};

export const updateUserService = async ({ id, updateObject }) => {
  try {
    const user = await updateUserRepo({ id, updateObject });
    return user;
  } catch (error) {
    throw new Error({
      message: error.message,
      status: error.status,
    });
  }
};

export const deleteUserService = async (id) => {
  try {
    const user = await deleteUserRepo(id);
    return user;
  } catch (error) {
    throw new Error({
      message: error.message,
      status: error.status,
    });
  }
};
