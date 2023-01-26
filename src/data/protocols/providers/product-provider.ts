export interface ProductProvider {
  loadProducts: () => Promise<any[]>
  loadProductById: (id: string) => Promise<any>
}
