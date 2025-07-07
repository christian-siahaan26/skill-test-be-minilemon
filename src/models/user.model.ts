import { type User as PrismaUser } from "@prisma/client";

class User {
  private id: number;
  private name: string;
  private email: string;
  private no_hp: string;
  private status: boolean;
  private departement: string;

  constructor(
    id: number,
    name: string,
    email: string,
    no_hp: string,
    status: boolean,
    departement: string
  ) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.no_hp = no_hp),
      (this.status = status),
      (this.departement = departement);
  }

  static fromEntity(prismaUser: PrismaUser) {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.no_hp,
      prismaUser.status,
      prismaUser.departement
    );
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      no_hp: this.no_hp,
      status: this.status,
      departement: this.departement,
    };
  }
}

export default User;
