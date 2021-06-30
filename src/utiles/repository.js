import {api} from './baseUrl';
  const getAlbums =async ()=>{
   return await api.get('/') 
}
const getAlbum =async (id)=>{
   return await api.get('/'+id) 
}
const updateAlbum =async (id,data)=>{
   return await api.put('/'+id,data) 
}
const deleteAlbum =async (id)=>{
   return await api.delete('/'+id) 
}

const postAlbum =async (data)=>{
   return await api.post('/',data) 
}



export const repository= {
    
   postAlbum,
   deleteAlbum,
   updateAlbum,
   getAlbum,
   getAlbums,
}