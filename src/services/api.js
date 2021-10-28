import axios from 'axios'

export const key = 'c7dbcb93b13cb5bce7b2082523ac541d'
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})

export default api;