import axios from 'axios';

export const getProducts = async ({
                                    page = 1,
                                    limit = 10,
                                    search = '',
                                  }) => axios.get('/products', {
  params: {
    page,
    limit,
    search,
  }
})
  .then((response) => ({
    pages: response.data.pages,
    products: response.data.data,
  }))

export const createProduct = async (product: any) => axios.post('/products', product)
  .then((response) => response.data)