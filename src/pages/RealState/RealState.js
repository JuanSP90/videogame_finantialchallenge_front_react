import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { green, grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fotoProfile4 from "../../images/foto8.jpg";

const defaultTheme = createTheme();

export default function Album() {
  const [houses, setHouses] = useState([]);
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [selectedRealState, setSelectedRealState] = useState(null);
  const {profile, setReload, reload } = useContext(AuthContext);


  const getRealStateData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/realStates/`);
      setHouses(response.data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
    }
  };

  const handleBuy = async () => {
    if (selectedRealState) {
      try {
        const response = await axios.post(
          `http://localhost:3001/realStates/buy/${selectedRealState._id}`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          // La compra fue exitosa
          toast.success("¡Compra realizada con éxito!");
          setShowPopUp1(false);
          setSelectedRealState(null);
          setReload(!reload);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.error === "no tienes dinero suficiente"
        ) {
          toast.error("No tienes suficiente dinero para comprar esta vivienda");
          setShowPopUp1(false);
        } else {
          console.log("error al comprar la vivienda", error);
        }
      }
    }
  };
  
  useEffect(() => {
    getRealStateData();
  }, []);

  const handleClick1 = (realState) => {
    setSelectedRealState(realState);
    setShowPopUp1(true);
  };
  const handleClick2 = (realState) => {
    setShowPopUp2(realState.description);
  };

  const handleCancel = () => {
    setShowPopUp1(false);
  };
  const handleCancel2 = () => {
    setShowPopUp2("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fotoProfile4})`,
        backgroundSize: "cover",
        backgroundPosition: "auto",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <div>
          <main
            style={{
              paddingTop: "40px",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 2,
                pb: 2,
                backgroundColor: "transparent",
                marginLeft: "250px",
                marginRight: "250px",
                padding: "10px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "70px",
                    textShadow: "2px 3px 5px #5b5b5b",
                    color: green[500],
                  }}
                >
                  <h1 sx={{ color: green[500] }}>
                    <span sx={{ color: green[500] }}>INMUEBLES</span>
                    <span></span>
                  </h1>
                </Typography>

                <Typography
                  variant="h5"
                  align="center"
                  color="green"
                  paragraph
                  sx={{
                    backgroundColor: "transparent",
                  }}
                >
                  Compra tus INMUEBLES para obtener la mayor cantidad de
                  ingresos posible y consigue TOP 1 en el ranking mundial
                </Typography>
              </Container>
            </Box>
            <Container sx={{ py: 1 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {houses.map((realState) => (
                  <Grid item key={realState._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: grey[300],
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1200px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                        ></Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "25px",
                            padding: "0.5em",
                            align: "center",
                          }}
                        >
                          {realState.name}
                        </Typography>

                        <Button
                          size="small"
                          onClick={() => handleClick2(realState)}
                          sx={{
                            color: green[500],
                            backgroundColor: "transparent",
                            padding: "0.1em",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          Descripción
                        </Button>
                        <Dialog
                          open={showPopUp2}
                          onClose={handleCancel2}
                          BackdropProps={{
                            sx: { backgroundColor: "transparent" },
                          }}
                        >
                          <DialogTitle>Descripción</DialogTitle>
                          <DialogContent>
                            <DialogContentText>{showPopUp2}</DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCancel2}
                              variant="contained"
                              color="grey"
                              sx={{
                                backgroundColor: green[300],
                                padding: "0.1em",
                                fontWeight: "bold",
                                marginBottom: "10px",
                              }}
                            >
                              CANCELAR
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Typography
                          align="center"
                          sx={{
                            backgroundColor: grey[400],
                            fontWeight: "bold",
                            padding: "0.2em",
                          }}
                        >
                          PRECIO: {realState.price}
                        </Typography>
                        <Typography
                          align="center"
                          sx={{
                            backgroundColor: grey[400],
                            fontWeight: "bold",
                            padding: "0.2em",
                          }}
                        >
                          INGRESO: {realState.income}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => handleClick1(realState)}
                          variant="contained"
                          color="grey"
                          sx={{
                            backgroundColor: green[300],
                          }}
                        >
                          COMPRAR
                        </Button>
                        <Dialog
                          open={showPopUp1}
                          onClose={handleCancel}
                          BackdropProps={{
                            sx: { backgroundColor: "transparent" },
                          }}
                        >
                          <DialogTitle>Confirmar compra</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              ¿ Esta seguro de que quiere comprar esta vivienda
                              ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCancel}
                              variant="contained"
                              color="grey"
                              sx={{
                                backgroundColor: grey[400],
                                color: green[500],
                              }}
                            >
                              CANCELAR
                            </Button>
                            <Button
                              onClick={() => handleBuy(realState)}
                              variant="contained"
                              color="grey"
                              autoFocus
                              sx={{
                                backgroundColor: grey[400],
                                color: green[500],
                              }}
                            >
                              COMPRAR
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
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
        </div>
      </ThemeProvider>
    </div>
  );
}
