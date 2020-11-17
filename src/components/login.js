import {React, useState, useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import authUserContext  from '../context/context';
import jwt from "jsonwebtoken";
import {
    Box, 
    TextField, 
    Grid,
    Button,
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Typography,
    Paper,
} from "@material-ui/core";
import {
    AccountCircle,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';

import LockIcon from '@material-ui/icons/Lock';
export default function Login(){
    const {
        isAuthenticated,
        checkAuthenticated,
        signIn,
        setNewToken,
    } = useContext(authUserContext);
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

    const [values, setValues] = useState({
        password: "",
        showPassword: false
      });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleLogin = async () => {
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
            body: JSON.stringify({ username: username, password: values.password }),
        }

        const response = await fetch(`http://localhost:3001/auth/login`, options);
        const res = await response.json();
        if(response.ok){
            const user = jwt.decode(res.token);
            checkAuthenticated(!isAuthenticated);
            signIn(user);
            setNewToken(res.token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            localStorage.setItem("token", JSON.stringify(res.token));
        }else if (response.status === 401) {
            setError(res.message);
            return;
        }
        history.push('/dashboard');
    };

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item>
            <Paper elevation={3}>
                <Box style={{ width: 300 }}>
                    <Grid
                        container
                        spacing={1}
                        justify="center"
                        style={{ marginTop: 10}}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Login
                            </Typography>
                        </Grid>
                    </Grid>
                    {error.length > 0 ? <Alert severity="error">{error}</Alert> : null}
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                    >
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label="Username"
                                value={username} 
                                style={{ width: 250 }} 
                                onChange={handleUsernameChange}    
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                    >
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
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
                                onClick={handleLogin}
                                disabled={!username.trim().length > 0 || !values.password.trim().length > 0 }
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                        style={{ marginBottom: 20 }}
                    >
                        <Grid item>
                            <Typography variant="subtitle1">
                                Don't have account?
                                <Link to="/register">
                                    Register now!
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            </Grid>
        </Grid>
    );
}