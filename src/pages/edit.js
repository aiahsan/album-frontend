import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';
import { repository } from '../utiles/repository'
import { useLocation, useHistory } from 'react-router-dom'
const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required(),
    artist: Yup.string().required(),
    imageUrl: Yup.string().required(),
});
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {

            ...theme.typography.h4
        },
        margin: {
            marginLeft: theme.spacing(5),
            marginTop: theme.spacing(5)
        }
        ,
        maxWidth: {
            maxWidth: 400,
        }
    }),
);
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default () => {
    const classes = useStyles();
    const [showanimation, setshowanimation] = React.useState(false);
    const [showmessage, setshowmessage] = React.useState(false);
    const [message, setmessage] = React.useState("");
    const location = useLocation();
    const history = useHistory();

    const postData = async (datapost) => {
        setshowanimation(true);
        if(location.state&&location.state.data)
            {
                console.log(datapost);
                (async ()=>{
                     const { data, status } = await repository.updateAlbum( datapost.id,datapost).then(x => x);
                    console.log(data);
                     if(status==200)
                {
                    setmessage(true);
                    setshowmessage("Album Updated");
                    setshowanimation(false);

                }
                else
                {
                    setmessage(true);
                    setshowmessage("Something went wrong");
                    setshowanimation(false)
                }
                })()
            }
            else
            {
                (async ()=>{
                    const { data, status } =  await repository.postAlbum(datapost).then(x => x)
                    console.log(data,status);
                    if(status==201)
                    {
                        setmessage(true);
                        setshowmessage("Album Added");
                        setshowanimation(false)
                    }else
                    {
                        setmessage(true);
                        setshowmessage("Something went wrong");
                        setshowanimation(false)
                    }
    
               })()
                            }
       
      


    }

    React.useEffect(()=>{
        console.log(location.state,"")
    },[])

    return <div>
        <Snackbar
        anchorOrigin={{ vertical:"top",horizontal: "right" }}
        open={showmessage}
        onClose={()=>setshowmessage(false)}
        message={showmessage}
        
      /> 
        <div className={`${classes.root} ${classes.margin}`}>{location.state&&location.state.data?"Update Album":"Add Album"}</div>
        <div >
            <div style={{ padding: '0 27%' }} >
                <Formik
                    initialValues={location.state&&location.state.data?{
                        name: location.state && location.state.data ? location.state.data.name : "",
                        artist: location.state && location.state.data ? location.state.data.artist : "",

                        imageUrl: location.state && location.state.data ? location.state.data.imageUrl : "",
                        id: location.state && location.state.data ? location.state.data.id : 0

                    }:{
                        name: "",
                        artist:  "",

                        imageUrl:"",
                    }}
                    validationSchema={DisplayingErrorMessagesSchema}
                    onSubmit={async (values, { setSubmitting }) => {

                        await postData(values)
                    }}
                >
                    {({ errors, touched, getFieldProps, handleSubmit }) => {
                        // cstErrors = errors;

                        return (
                            <Form>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="my-input">Name</InputLabel>
                                    <Input   {...getFieldProps("name")} aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">Course Name</FormHelperText>
                                    {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.name}</div>}
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="my-input">Artist</InputLabel>
                                    <Input   {...getFieldProps("artist")} aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">Artist</FormHelperText>
                                    {touched.artist && errors.artist && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.artist}</div>}
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="my-input">Image URL</InputLabel>
                                    <Input   {...getFieldProps("imageUrl")} aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">Image URL</FormHelperText>
                                    {touched.imageUrl && errors.imageUrl && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.imageUrl}</div>}
                                </FormControl>

                                <div>
                                    <Button variant="contained" onClick={handleSubmit} color="primary">
                                        
                                     {showanimation==false?location.state&&location.state.data?"Save":"Add": <CircularProgress color="white" />}   
                                    
                                   
                                    </Button>

                                </div>


                            </Form>
                        )

                    }}
                </Formik>




            </div>

        </div>
    </div>

}