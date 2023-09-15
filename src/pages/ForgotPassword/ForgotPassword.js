import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import backfoto from "../../images/foto8.jpg";
import { useState } from "react";
import axios from 'axios'

const defaultTheme = createTheme();

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/users/forgotPassword/', {
                email: email
            });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };


    return (
        <div style={{
            backgroundImage: `url(${backfoto})`,
            minHeight: "100vh",
        }}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            color: "white",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop: 20,
                        }}>
                        <Typography component="h1" variant="h3">
                            Recuperar Contraseña
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                type="email"
                                placeholder="Ingrese su email"
                                onChange={(e) => setEmail(e.target.value)}
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'darkgray',
                                            backgroundColor: 'rgba(169, 169, 169, 0.2)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                        color: 'white'
                                    },
                                }}
                            />

                            <Button type="submit" fullWidth variant="contained"
                                sx={{
                                    mt: 3, mb: 2,
                                    backgroundColor: green[700],
                                    '&:hover': {
                                        backgroundColor: green[500]
                                    },
                                }}>
                                Recuperar contraseña
                            </Button>
                            <Button type="submit" variant="contained"
                                sx={{
                                    mt: 3, mb: 2,
                                    backgroundColor: 'red',
                                    '&:hover': {
                                        backgroundColor: green[500]
                                    }, width: '50%'
                                }}
                                onClick={() => {
                                    navigate(`/`);
                                }}
                            >
                                Volver
                            </Button>
                            <Grid container>
                                <Grid item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
