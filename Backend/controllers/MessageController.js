import Message from "../models/MessageModels.js";

export const getMessages = async (req, res) => {
  try {
    const response = await Message.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const response = await Message.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    await Message.create(req.body);
    res.status(200).json({response: "Message created successfully"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMessage = async (req, res) => {
    try {
      await Message.update(req.body, {
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Message updated successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const deleteMessage = async (req, res) => {
    try {
      await Message.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json({response: "Message deleted successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
