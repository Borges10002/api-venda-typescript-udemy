import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  user_id: string;
}

class ShowProductService {
  public async execute({ user_id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.findOne(user_id);

    if (!products) {
      throw new AppError("Product not found.");
    }

    return products;
  }
}

export default ShowProductService;
