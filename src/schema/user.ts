export type CreateUserType = {
  request: {
    phone: string;
    password: string;
    code: string;
  }
}

export type LoginUserType = {
  request: {
    phone: string;
    password: string;
  }
}