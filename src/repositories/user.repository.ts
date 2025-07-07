import { PrismaClient, Prisma } from "@prisma/client";
import User from "../models/user.model";
import { CreateUserDto, UpdateUserDto, UserFilters } from "../types/user";
import { PaginationParams } from "../types/pagination";
import { getErrorMessage } from "../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(
    pagination?: PaginationParams,
    filters?: UserFilters
  ): Promise<{ users: User[]; total: number } | string> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.UserWhereInput = {
        ...(filters?.search && {
          OR: [
            {
              name: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              email: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              no_hp: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              departement: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }),
        ...(filters?.startDate && { createdAt: { gte: filters.startDate } }),
        ...(filters?.endDate && { createdAt: { lte: filters.endDate } }),
        ...(filters?.status !== undefined ? { status: filters.status } : {}),
      };

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.prisma.user.count({
          where,
        }),
      ]);

      return {
        users: users.map((user) => User.fromEntity(user)),
        total,
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async findById(id: number): Promise<User | null | string> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        } as Prisma.UserWhereInput,
      });

      return user ? User.fromEntity(user) : null;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async create(userData: CreateUserDto): Promise<User | string> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          no_hp: userData.no_hp,
          status: userData.status,
          departement: userData.departement,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Prisma.UserCreateInput,
      });

      return User.fromEntity(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Email already exists");
        }
      }
      return getErrorMessage(error);
    }
  }

  async update(id: number, userData: UpdateUserDto): Promise<User | string> {
    try {
      const user = await this.prisma.user.update({
        where: { id } as Prisma.UserWhereUniqueInput,
        data: {
          ...userData,
          updatedAt: new Date(),
        },
      });

      return User.fromEntity(user);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async delete(id: number): Promise<User | string> {
    try {
      const user = await this.prisma.user.delete({
        where: { id } as Prisma.UserWhereUniqueInput,
      });

      return User.fromEntity(user);
    } catch (error) {
      return getErrorMessage(error);
    }
  }
}

export default UserRepository;
