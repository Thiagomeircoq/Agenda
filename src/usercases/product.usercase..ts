import { ProductCreate, ProductUpdate, ProductRepository } from "../interface/products.interface";
import { ProductRepositoryPrisma } from "../repositories/product.repository";

class ProductUserCase {
    private productRepository: ProductRepository
    constructor() {
        this.productRepository = new ProductRepositoryPrisma;
    }

    async create(data: ProductCreate) {

        const product = await this.productRepository.create({
            image: data.image,
            name: data.name,
            description: data.description,
            price: data.price,
            promotionalPrice: data.promotionalPrice,
            promotionStartDate: data.promotionStartDate,
            promotionEndDate: data.promotionEndDate
        });

        return product;
    }

    async findAllProducts() {
        const products = await this.productRepository.findAllProducts();

        return products;
    }

    async findById(id: string) {
        const product = await this.productRepository.findById(id);

        return product;
    }

    async deleteProduct(id: string) {
        const data = await this.productRepository.deleteProduct(id);

        return data;
    }

    async updateProduct(data: ProductUpdate) {
        const product = await this.productRepository.updateProduct(data);

        return product;
    }


}

export { ProductUserCase };