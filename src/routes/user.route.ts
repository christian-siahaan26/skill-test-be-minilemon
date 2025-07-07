import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import UserRepository from "../repositories/user.repository";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prismaClient = new PrismaClient();
const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));
router.get("/:id", (req, res, next) =>
  userController.getUserById(req, res, next)
);
router.post("/", (req, res, next) => userController.createUser(req, res, next));
router.put("/:id", (req, res, next) =>
  userController.updateUser(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  userController.deleteUser(req, res, next)
);

export default router;
