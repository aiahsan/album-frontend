import React from 'react'
import logo from '../logo.svg'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AlbumCard = (props) => {
    const history= useHistory();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return (
    <>
    <Card>
            <CardActionArea>
            <img src={props.image} width="200px" alt=""/>

                <CardHeader title={props.title} subheader={props.artist}/>
                <CardMedia image={logo} title={props.title}/>
                <CardContent>
                    <Typography variant={"body2"} color={"textSecondary"} component={"p"}>
                        This is a test description of the album
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={()=>history.push('/edit',{data:{
                    imageUrl:props.image,
                    name:props.title,
                    artist:props.artist,
                    id:props.id
                }})} size="small" color="primary">
                    Edit
                </Button>
                <Button onClick={handleClickOpen}  size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action can not be revoked
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={()=>{
                handleClose()
                props.removeCard(props.id)
            }} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        </>
    );
}
