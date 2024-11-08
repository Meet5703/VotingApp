import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  signInService,
  updateUserService,
} from "../services/User.js";

export const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }
    const user = await createUserService({ username, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signInService({ email, password }, res);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateObject = req.body;
    const user = await updateUserService({ id, updateObject });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUserService(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};
