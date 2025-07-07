export type User = {
  id: number;
  name: string;
  email: string;
  no_hp: string;
  status: boolean;
  departement: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDto = {
  name: string;
  email: string;
  no_hp: string;
  status: boolean;
  departement: string;
}

export type UpdateUserDto = {
  name?: string;
  email?: string;
  no_hp: string;
  status: boolean;
  departement: string;
}

export interface UserFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status?: boolean | undefined;
}
