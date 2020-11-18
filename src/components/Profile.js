import {React, useState, useContext } from "react";
import authUserContext  from '../context/context';
import Swal from 'sweetalert2';
import jwt from "jsonwebtoken";
import {
    Box, 
    TextField, 
    Grid,
    Button,
    IconButton,
    Typography,
    Paper,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';

export default function Register(){
    const {
        signIn,
        setNewToken,
    } = useContext(authUserContext);
    const context = useContext(authUserContext);
    const user = context.user;
    const [isEditName,setIsEditName] = useState(false);
    const [isEditEmail,setIsEditEmail] = useState(false);
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        email: user.email,
        name: user.name,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleEditName = () => {
        setIsEditName(!isEditName);
    }

    const handleEditEmail = () => {
        setIsEditEmail(!isEditEmail);
    }

    const handleUpdate = async () => {

        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;         
        if(!values.email.match(pattern)){
            setError('Invalid email');
            return;
        }

        const options = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({  
                id: user.id,
                name: values.name,
                email: values.email,
            }),
        }

        const response = await fetch(`https://dagk-retro-api.herokuapp.com/auth/edit`, options);
        const res = await response.json();
        if(response.ok){
            const user = jwt.decode(res.token);
            signIn(user);
            setNewToken(res.token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(res.token));
            setIsEditName(false);
            setIsEditEmail(false);
            await Swal.fire({
                icon: 'success',
                title: res.message,
            })
        }else if (response.status === 401) {
            setValues({ ...values, email: user.email, name: user.name });
            setError(res.message);
            return;
        }
        
    };

    return(
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item>
            <Paper elevation={3}>
                <Box style={{ width: 300 }}>
                    <Grid container spacing={1} justify="center" style={{ marginTop: 10}}>
                        <Grid item>
                            <Typography variant="h4">
                                Profile
                            </Typography>
                        </Grid>
                    </Grid>
                    {error.length > 0 ? <Alert severity="error">{error}</Alert> : null}
                    <Grid container spacing={1} justify="center">
                        <Grid item xs={2} style={{paddingTop: 15}}>
                            <EmailIcon />
                        </Grid>
                        <Grid item xs={8} style={{paddingTop: 15}}>
                        {isEditEmail ?
                            <TextField value={values.email} autoFocus fullWidth onChange={handleChange('email')}/>
                            : <Typography>
                                <Box fontWeight="fontWeightBold">
                                    {values.email}
                                </Box>
                            </Typography>
                        }
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                onClick={handleEditEmail}
                                color="inherit"
                            >
                                <EditIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        justify="center"
                    >
                        <Grid item xs={2} style={{paddingTop: 15}}>
                            <FaceIcon />
                        </Grid>
                        <Grid item xs={8} style={{paddingTop: 15}}>
                        {isEditName ?
                            <TextField value={values.name} autoFocus fullWidth onChange={handleChange('name')} />
                            : <Typography>
                                <Box fontWeight="fontWeightBold">
                                    {values.name}
                                </Box>
                            </Typography>
                        }
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                onClick={handleEditName}
                                color="inherit"
                            >
                                <EditIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                        style={{ marginTop: 20, marginBottom: 10 }}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                                disabled={
                                    (!isEditName && !isEditEmail) ||
                                    !values.email.trim().length > 0 ||
                                    !values.name.trim().length > 0
                                }
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>
            </Paper>
            </Grid>
        </Grid>
    );
}