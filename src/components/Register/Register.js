import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { green } from "@mui/material/colors";
import backfoto from "../../images/foto8.jpg";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const [emailError, setEmailError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const newUser = {
      userName: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      await axios.post("http://localhost:3001/users", newUser);
      login(newUser.password, newUser.email);

      navigate("/Profile");
    } catch (error) {
      console.log("error al registrarme", error);
      handleToastFail();
    }
  };

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmailError(!isValidEmail(inputValue));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleToastFail = () => {
    toast.error("Su user name , email o password no son válidos");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backfoto})`,
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <Typography component="h1" variant="h3">
              Regístrate
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre de usuario"
                    autoFocus
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    InputProps={{
                      classes: {
                        underline: emailError ? "error-underline" : "",
                      },
                      style: { borderColor: "white", color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "darkgray",
                          backgroundColor: "rgba(169, 169, 169, 0.2)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    error={emailError} // Aplicar el estilo de error si el email es inválido
                    helperText={emailError ? "Email incorrecto" : ""}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    InputProps={{
                      classes: {
                        underline: emailError ? "error-underline" : "",
                      },
                      style: { borderColor: "white", color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "darkgray",
                          backgroundColor: "rgba(169, 169, 169, 0.2)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    InputProps={{
                      classes: {
                        underline: emailError ? "error-underline" : "",
                      },
                      style: { borderColor: "white", color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "darkgray",
                          backgroundColor: "rgba(169, 169, 169, 0.2)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: green[700],
                  "&:hover": {
                    backgroundColor: green[500],
                  },
                }}
              >
                Registrarse
              </Button>
            </Box>
          </Box>
        </Container>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </div>
  );
}
