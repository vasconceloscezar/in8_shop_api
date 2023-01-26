import { type Product } from '@/domain/models'
import env from '@/main/config/env'
import { type ProductProvider, type RequestResponse } from '../protocols'

export type ProductBrazilianProvider = {
  nome: string
  descricao: string
  categoria: string
  imagem: string
  preco: string
  material: string
  departamento: string
  id: string
}

export class BrazilianProvider implements ProductProvider {
  constructor (private readonly get: (url: string) => Promise<RequestResponse>) {}

  private parseProduct (product: ProductBrazilianProvider): Product {
    const productParsed = {
      id: `${product.id}-BR`,
      name: product.nome,
      description: product.descricao,
      hasDiscount: false,
      images: [product.imagem],
      price: parseFloat(product.preco),
      details: {
        departament: product.departamento,
        adjective: '',
        material: product.material
      },
      discountValue: 0
    }
    return productParsed
  }

  async loadProducts (): Promise<Product[]> {
    try {
      const data = await this.get(env.providersURL.brazilian).then(res => res.data)
      const mappedProducts = data.map((product: ProductBrazilianProvider) => {
        if (!product.nome) return null
        return this.parseProduct(product)
      })
      return mappedProducts.filter((product: Product) => product !== null)
    } catch (error) {
      console.error('Problem loading brazilian products', error.message)
      return []
    }
  }

  async loadProductById (id: string): Promise<any> {
    const data = await this.get(`${env.providersURL.brazilian}/${id}`).then(res => res.data)
    return data
  }
}
