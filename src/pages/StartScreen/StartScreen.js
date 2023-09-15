import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "../../components/Login/Login.css";
import { useNavigate } from "react-router-dom";
import backfoto from "../../images/foto8.jpg";
import { green } from "@mui/material/colors";

const tiers = [
  {
    title: "Regístrate",
    description: [
      "Da el siguiente paso hacia tu éxito.",
      "Conviértete en un experto en negocios.",
      "Adquiere inmuebles y prospera.",
      "Invierte en la bolsa con confianza.",
    ],
    buttonText: "¡Regístrate ahora!",
    buttonVariant: "contained",
    component: <Register />,
    path: "/register",
  },
  {
    title: "Iniciar Sesión",
    description: [
      "Protege y monitorea tus inversiones.",
      "Mantente informado con las noticias.",
      "Revisa la bolsa.",
      "Observa tendencias en el ranking.",
    ],
    buttonText: "¡Inicia ahora!",
    buttonVariant: "contained",
    component: <Login />,
    path: "/login",
  },
];

const defaultTheme = createTheme();

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${backfoto})`,
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />

        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{
              color: green[500],
              fontFamily: "serif",
              fontSize: "70px",
              fontWeight: "bold",
              textShadow: "2px 3px 5px #6b6b6b",
            }}
          >
            Finantial Challenge
          </Typography>
          <Typography
            variant="h3"
            align="center"
            color="white"
            component="p"
            sx={{
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Simulador interactivo, aprende jugando!
          </Typography>
        </Container>

        <Container maxWidth="md" component="main">
          <Grid
            container
            spacing={4}
            alignItems="flex-end"
            justifyContent={"center"}
          >
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={5}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{
                      align: "center",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "2em",
                      fontWeight: "600",
                    }}
                    action={tier.title === "Pro" ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? green[600]
                          : green[700],
                    }}
                  />
                  <CardContent>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                          sx={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "1em",
                            fontWeight: "600",
                          }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      sx={{
                        fontSize: "1.4em",
                        fontFamily: "Roboto, sans-serif",
                        backgroundColor: "green",
                        "&:hover": {
                          backgroundColor: green[700],
                        },
                      }}
                      onClick={() => navigate(tier.path)}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}
