import RuleBase from "../models/RuleBaseModels.js";


export const getRuleBases = async (req, res) => {
  try {
    const response = await RuleBase.findAll({
      // include: [
      //   {
      //     model: model.Interval,
      //   }
      // ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRuleBaseById = async (req, res) => {
  try {
    const response = await RuleBase.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRuleBase = async (req, res) => {
  try {
    await RuleBase.create(req.body);
    res.status(200).json({response: "Rule Base created successfully"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRuleBase = async (req, res) => {
    try {
      await RuleBase.update(req.body, {
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Rule Base updated successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const deleteRuleBase = async (req, res) => {
    try {
      await RuleBase.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Rule Base deleted successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
