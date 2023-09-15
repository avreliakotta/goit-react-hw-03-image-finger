export const fetchPhotos = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=38409790-9d6abd70194af5cc66bb0293b&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Not found ${query}`));
  });
};
