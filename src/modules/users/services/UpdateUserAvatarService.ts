import AppError from "@shared/errors/AppError";
import path from "path";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import uploadConfig from "@config/upload";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      try {
        // Verifica se o arquivo do avatar existe
        await fs.promises.stat(userAvatarFilePath);

        // Se o arquivo existir, ele será removido
        await fs.promises.unlink(userAvatarFilePath);
        // console.log("Avatar antigo removido com sucesso!");
      } catch (error: any) {
        // Se o erro for "arquivo não encontrado", captura o erro sem lançar exceção
        if (error.code === "ENOENT") {
          //   console.log("Avatar antigo não encontrado, nada para remover.");
        } else {
          // Lança o erro se for qualquer outro problema
          throw new AppError(error);
        }
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
