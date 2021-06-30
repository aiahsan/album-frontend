import { create } from 'apisauce'
export const api = create({
    baseURL: 'https://album-api.azurewebsites.net/',
    headers: { Accept: 'application/vnd.github.v3+json' ,'Content-Type':'application/json'},
  })

