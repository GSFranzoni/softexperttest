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