import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Icorrect email/password combination.", 401);
    }

    const passwordComfirmed = await compare(password, user.password);

    if (!passwordComfirmed) {
      throw new AppError("Icorrect email/password combination.", 401);
    }

    return user;
  }
}

export default CreateSessionsService;
