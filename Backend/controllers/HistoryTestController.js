import History from "../models/HistoryTestModels.js";

export const getHistorys = async (req, res) => {
  try {
    const response = await History.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const response = await History.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createHistory = async (req, res) => {
  try {
    await History.create(req.body);
    res.status(200).json({response: "History created successfully"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateHistory = async (req, res) => {
    try {
      await History.update(req.body, {
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "History updated successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const deleteHistory = async (req, res) => {
    try {
      await History.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "History deleted successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
