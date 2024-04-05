import Interval from "../models/IntervalModels.js";

export const getIntervals = async (req, res) => {
  try {
    const response = await Interval.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getIntervalById = async (req, res) => {
  try {
    const response = await Interval.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInterval = async (req, res) => {
  try {
    await Interval.create(req.body);
    res.status(200).json({response: "Interval created successfully"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateInterval = async (req, res) => {
    try {
      await Interval.update(req.body, {
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Interval updated successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const deleteInterval = async (req, res) => {
    try {
      await Interval.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Interval deleted successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
