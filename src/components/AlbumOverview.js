import React from 'react'
import {Button, Grid} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import {AlbumCard} from "./AlbumCard";
import {repository} from '../utiles/repository'
export function AlbumOverview() {
    const history= useHistory();
    const [albums,setalbums] = React.useState([  
    ]);

    const removeCard=(id)=>{
       (async ()=>{
        const {data,status} =await repository.deleteAlbum(id);
        if(status==204){
            setalbums(albums.filter(x=>x.id!=id));
        }
       })()
    }
    React.useEffect(()=>{
    (async ()=>{
      const {data,status}=  await repository.getAlbums();
      if(status==200)
      {
        setalbums(data.albumResponses);
      }
    })()
        
    },[])

    return (
        <Grid container spacing={3}>
            {albums.map(album => (
                <Grid item key={album.id}>
                    <AlbumCard removeCard={removeCard} id={album.id} image={album.imageUrl} title={album.name} artist={album.artist}/>
                </Grid>
            ))}
            <Grid item key={"new"}>
                <Button onClick={()=>history.push('/edit')} size="large" variant={"contained"} color="primary">
                    Add
                </Button>
            </Grid>
        </Grid>
    );
}
