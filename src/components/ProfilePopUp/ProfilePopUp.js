import React from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { useState, useContext } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfilePopUp.css';

const defaultTheme = createTheme();

const ProfilePopUp = (props) => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);

    const { profile, reload, setReload } = useContext(AuthContext);

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        setEmailError(!isValidEmail(inputValue));
    };

    const EmailChange = async () => {
        try {
            await axios.patch('http://localhost:3001/users/updateUser', { email: email }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }

            })

            toast.success('Email cambiado con exito', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setReload(!reload)

        } catch (error) {

            console.error('Error al actualizar el email', error);
            toast.error(`El email ya esta en uso`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const PasswordChange = async () => {
        try {
            await axios.patch('http://localhost:3001/users/updateUser', { password: password }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }

            })
            setReload(!reload)

            toast.success('Contraseña actualizada con exito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });

        } catch (error) {

            console.error('Error al actualizar la contraseña', error);
            toast.error(`${error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
    }


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const NameChange = async () => {
        try {
            await axios.patch('http://localhost:3001/users/updateUser', { userName: username }, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }

            })

            toast.success(`El nombre de usuario cambiado con exito`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });


        } catch (error) {
            console.error('Error al actualizar el userName', error);
            toast.error(`El nombre de usuario ya esta en uso`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
        setReload(!reload)

    }

    const isValidEmail = (email) => {

        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };


    return (

        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs"  >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <button id="exit" style={{ display: "flex", alignSelf: "flex-end", width: "22px", borderRadius: "50px", justifyContent: "center" }} onClick={props.cerrar}>X</button>
                    <Typography component="h1" variant="h5">
                        Configuración
                    </Typography>
                    {/* <ToastContainer /> */}
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Insertar nuevo email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                error={emailError}
                                helperText={emailError ? 'Email incorrecto' : ''}
                                InputProps={{
                                    classes: {
                                        underline: emailError ? 'error-underline' : '',
                                    },
                                }}

                            />
                            <Button onClick={EmailChange} id="myButton">Cambiar</Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Insertar nueva contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Button onClick={PasswordChange} id="myButton">Cambiar</Button>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="username"
                                label="Insertar nuevo nombre"
                                type="username"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />

                            <Button id="myButton" onClick={NameChange} >Cambiar</Button>
                        </Box>
                        <Grid container>
                            <Grid item sx={{ marginTop: "20px" }}>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >


    )
}
export default ProfilePopUp