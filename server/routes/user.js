const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/users", auth.verifyAdmin, userController.getUsers);

router.post("/user-add", userController.addUser);

router.post("/user", auth.verifyAdmin, userController.getUser);

router.post("/user-edit", auth.verifyAdmin, userController.updateUser);

router.post("/user-delete", auth.verifyAdmin, userController.removeUser);

router.post("/card-add", auth.verifyClient, userController.postOrder);

router.get("/card-list", userController.getOrders);

router.post("/update-profile", auth.verifyAuthToken, userController.updateProfile);

router.post("/change-password", auth.verifyAuthToken, userController.changePassword);

router.post("/order-status", auth.verifyAssistant, userController.postOrderStatus);

router.get("/clients-connected", userController.getConnectedClients);

module.exports = router;
