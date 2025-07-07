import { NextFunction, Response, Request } from "express";
import { responses } from "../constants";
import UserService from "../services/user.service";
import { UserFilters } from "../types/user";
import { PaginationParams } from "../types/pagination";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
      };

      const filters: UserFilters = {
        search: req.query.search as string,
        startDate: req.query.startDate
          ? new Date(req.query.startDate as string)
          : undefined,
        endDate: req.query.endDate
          ? new Date(req.query.endDate as string)
          : undefined,
      };

      const result = await this.userService.getAllUser(pagination, filters);

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(200).json({
        success: true,
        message: responses.successGetUsers,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getUserById(Number(req.params.id));

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(200).json({
        success: true,
        message: responses.successGetUsers,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, no_hp, departement } = req.body;

      if (!name || !email || !no_hp || !departement) {
        return res.status(400).json({
          success: false,
          message: "Name, email, no_hp, and departement are required.",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format.",
        });
      }

      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(no_hp) || no_hp.length < 10) {
        return res.status(400).json({
          success: false,
          message:
            "Phone number must be at least 10 characters and contain only digits.",
        });
      }

      const result = await this.userService.createUser({
        name: req.body.name,
        email: req.body.email,
        no_hp: req.body.no_hp,
        status: req.body.status,
        departement: req.body.departement,
      });

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(201).json({
        success: true,
        message: responses.successCreateUser,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.updateUser(
        Number(req.params.id),
        req.body
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(200).json({
        success: true,
        message: responses.successUpdateUser,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.deleteUser(Number(req.params.id));

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(204).json({
        success: true,
        message: responses.successDeleteUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
