import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import backfoto from "../../images/foto8.jpg";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  const { login, reload, setReload } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    setEmailError(!isValidEmail(inputValue));
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      console.log("Email incorrecto");
      return;
    }

    login(password, email);
    navigate("/Profile");
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
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={emailError}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
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
              <Button
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: green[500],
                  },
                  width: "50 %",
                  fontSize: "12px",
                }}
                onClick={() => {
                  navigate(`/ForgotPassword`);
                }}
              >
                ¿Recuperar la contraseña?
              </Button>
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
                Iniciar
              </Button>
              <Grid container>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
