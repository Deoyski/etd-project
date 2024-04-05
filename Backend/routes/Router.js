import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/UserController.js";
import { createInterval, deleteInterval, getIntervalById, getIntervals, updateInterval } from "../controllers/IntervalController.js";
import { createCiriJenazah, deleteCiriJenazah, getCiriJenazahById, getCiriJenazahs, updateCiriJenazah } from "../controllers/CiriJenazahController.js";
import { createRuleBase, deleteRuleBase, getRuleBaseById, getRuleBases, updateRuleBase} from "../controllers/RuleBaseController.js";
import { createMessage, deleteMessage, getMessageById, getMessages, updateMessage} from "../controllers/MessageController.js";
import { createHistory, deleteHistory, getHistoryById, getHistorys, updateHistory } from "../controllers/HistoryTestController.js";

const router = express.Router();

// User Router
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Interval Router
router.get("/interval", getIntervals);
router.get("/interval/:id", getIntervalById);
router.post("/interval", createInterval);
router.patch("/interval/:id", updateInterval);
router.delete("/interval/:id", deleteInterval);

// Ciri Jenazah Router
router.get("/ciri-jenazah", getCiriJenazahs);
router.get("/ciri-jenazah/:id", getCiriJenazahById);
router.post("/ciri-jenazah", createCiriJenazah);
router.patch("/ciri-jenazah/:id", updateCiriJenazah);
router.delete("/ciri-jenazah/:id", deleteCiriJenazah);

// Ciri Jenazah Router
router.get("/rule-base", getRuleBases);
router.get("/rule-base/:id", getRuleBaseById);
router.post("/rule-base", createRuleBase);
router.patch("/rule-base/:id", updateRuleBase);
router.delete("/rule-base/:id", deleteRuleBase);

// Message
router.get("/message", getMessages);
router.get("/message/:id", getMessageById);
router.post("/message", createMessage);
router.patch("/message/:id", updateMessage);
router.delete("/message/:id", deleteMessage);

// History
router.get("/history", getHistorys);
router.get("/history/:id", getHistoryById);
router.post("/history", createHistory);
router.patch("/history/:id", updateHistory);
router.delete("/history/:id", deleteHistory);

export default router;