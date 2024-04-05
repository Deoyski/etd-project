import User from "../models/UserModels.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).json({response: "User created successfully"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
    try {
      await User.update(req.body, {
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "User updated successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      await User.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "User deleted successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
