import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchContry(name) {
  const BaseURL = `https://restcountries.com/v3.1/name/${name}?`;
  return fetch(BaseURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(`${error.name}: ${error.message}`));
}
