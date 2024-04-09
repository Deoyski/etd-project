import User from "../models/UserModels.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Fungsi untuk membuat token
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' }); // Ganti 'your-secret-key' dengan kunci rahasia yang aman
};

// Login route
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and if the password is correct
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    // Generate JWT token
    const token = generateToken(user.id);
    const role = user.role;
    const id = user.id;
    const username = user.username;

    res.status(200).json({ message: 'Login successful', token, role, id, username });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
    const newUser = await User.create(req.body);
    
    // Buat token untuk pengguna yang baru dibuat
    const token = generateToken(newUser.id);

    res.status(200).json({ response: "User created successfully", token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.update(req.body, {
      where: { id: userId },
      returning: true, // Mengembalikan data pengguna yang diperbarui
    });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ambil ID pengguna yang diperbarui dari data yang dikembalikan
    const updatedUserId = updatedUser[1][0].id;

    // Buat token untuk pengguna yang diperbarui
    const token = generateToken(updatedUserId);

    res.status(200).json({ response: "User updated successfully", token });
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
