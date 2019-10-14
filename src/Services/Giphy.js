import config from '../config';
const {apiKey} = config
export const search = async (skip, take, searchTerm) => {
    try {
      let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${take}&offset=${skip}&rating=G&lang=en`)  
      let jsonResponse = await response.json()
      return jsonResponse.data
    } catch(err) {
      console.log(err)
    }
  }