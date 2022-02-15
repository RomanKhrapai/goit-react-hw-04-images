import axios from 'axios';

const key = '24343204-c81a45d0777a603181c59324d';
axios.defaults.baseURL = 'https://pixabay.com/';

export const fetchArticlesWithQuery = async (page, search) => {
  const response = await axios.get(
    `api/?q==${search}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

export default {
  fetchArticlesWithQuery,
};
