import { User } from "../models/User.js";

export const createUserRepo = async ({ username, email, password }) => {
  try {
    const user = await User.create({ username, email, password, role: "user" });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmailRepo = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByIdRepo = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsersRepo = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserRepo = async ({ id, updateObject }) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateObject, { new: true });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserRepo = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
