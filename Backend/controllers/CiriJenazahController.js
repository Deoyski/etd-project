import CiriJenazah from "../models/CiriJenazahModels.js";

// Create a new user
export const getCiriJenazahs = async (req, res) => {
  try {
    const response = await CiriJenazah.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCiriJenazahById = async (req, res) => {
  try {
    const response = await CiriJenazah.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCiriJenazah = async (req, res) => {
  try {
    await CiriJenazah.create(req.body);
    res.status(200).json({response: "Ciri Jenazah created successfully"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCiriJenazah = async (req, res) => {
    try {
      await CiriJenazah.update(req.body, {
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Ciri Jenazah updated successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const deleteCiriJenazah = async (req, res) => {
    try {
      await CiriJenazah.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Ciri Jenazah deleted successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
