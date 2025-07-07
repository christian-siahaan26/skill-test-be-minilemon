import User from "../models/user.model";
import { CreateUserDto, UpdateUserDto, UserFilters } from "../types/user";
import { PaginationParams, PaginatedResult } from "../types/pagination";
import UserRepository from "../repositories/user.repository";

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUser(
    pagination?: PaginationParams,
    filters?: UserFilters
  ): Promise<PaginatedResult<User> | string> {
    const data = await this.userRepository.findAll(pagination, filters);

    if (typeof data === "string") {
      return data;
    }

    const { users, total } = data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 12;
    const lastPage = Math.ceil(total / limit);

    return {
      data: users,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }

  async getUserById(id: number): Promise<User | string> {
    const user = await this.userRepository.findById(id);
    if (typeof user === "string") {
      return user;
    }

    if (!user) {
      return "User not found";
    }

    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User | string> {
    const result = await this.userRepository.create(userData);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }

  async updateUser(
    id: number,
    userData: UpdateUserDto
  ): Promise<User | string> {
    const existingUser = await this.userRepository.findById(id);
    if (typeof existingUser === "string") {
      return existingUser;
    }

    if (!existingUser) {
      return "User not found";
    }

    const result = await this.userRepository.update(id, userData);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }

  async deleteUser(id: number): Promise<User | string> {
    const existingUser = await this.userRepository.findById(id);
    if (typeof existingUser === "string") {
      return existingUser;
    }

    if (!existingUser) {
      return "User not found";
    }

    const result = await this.userRepository.delete(id);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }
}

export default UserService;
