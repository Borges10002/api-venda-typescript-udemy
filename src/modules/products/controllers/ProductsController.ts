import { Request, Response } from "express";
import ListProducService from "../services/ListProducService";
import ShowProductService from "../services/ShowProductService";

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProducService();

    const products = listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = showProduct.execute({ id });

    return response.json(product);
  }
}
