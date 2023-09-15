import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { green, grey } from "@mui/material/colors";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import fotoProfile4 from "../../images/foto8.jpg";

import axios from "axios";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const defaultTheme = createTheme();

const ProfileHouses = () => {
  const [userRealStates, setUserRealStates] = useState([]);
  const [showPopUp2, setShowPopUp2] = useState("");

  const { profile } = useContext(AuthContext);

  useEffect(() => {
    const findUserRealStates = async () => {
      const userRealStatesAux = [];
      if (profile.realState != null) {
        for (let i = 0; i < profile.realState.length; i++) {
          const aux = await axios.get(
            `http://localhost:3001/realStates/${profile.realState[i]._id}`
          );
          userRealStatesAux.push(aux.data);
        }
        setUserRealStates(userRealStatesAux);
        console.log(`userRealStates: ${userRealStates}`);
      }
    };

    findUserRealStates();
  }, [profile]);

  const handleClick2 = (realState) => {
    setShowPopUp2(realState.description);
  };

  const handleCancel2 = () => {
    setShowPopUp2("");
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${fotoProfile4})`,
            backgroundSize: "cover",
            backgroundPosition: "auto",
          }}
        >
          <Container
            disableGutters
            maxWidth="sm"
            component="main"
            sx={{ pt: 8, pb: 6 }}
          >
            <Typography
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "70px",
                // fontWeight: "bold",
                textShadow: "2px 3px 5px #5b5b5b",
                color: green[500],
              }}
            >
              <h1 sx={{ color: green[500] }}>
                <span sx={{ color: green[500] }}>
                  Estas son tus propiedades {profile.userName}
                </span>
                <span></span>
              </h1>
            </Typography>
          </Container>
          <Container maxWidth="1" component="main">
            <Grid
              container
              spacing={8}
              alignItems="flex-end"
              justifyContent={"center"}
              Width={1}
            >
              {userRealStates.map((realState) => (
                <Grid item key={realState} xs={6} sm={3} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: grey[300],
                      marginBottom: "100px"
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
                        description
                      </Button>
                      <Dialog
                        open={showPopUp2}
                        onClose={handleCancel2}
                        BackdropProps={{
                          sx: { backgroundColor: "transparent" },
                        }}
                      >
                        <DialogTitle>Description</DialogTitle>
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
                            CANCEL
                          </Button>
                        </DialogActions>
                      </Dialog>

                      {/* <Typography
                                 color="text.secundary"
                                 align="center"
                                 paragraph
                                 sx={{
                                   fontSize: "13px",
                                 }}
                               >
                                 {realState.description}
                               </Typography> */}
                      <Typography
                        align="center"
                        sx={{
                          backgroundColor: grey[400],
                          fontWeight: "bold",
                          padding: "0.2em",
                        }}
                      >
                        PRICE: {realState.price}
                      </Typography>
                      <Typography
                        align="center"
                        sx={{
                          backgroundColor: grey[400],
                          fontWeight: "bold",
                          padding: "0.2em",
                        }}
                      >
                        INCOME: {realState.income}
                      </Typography>
                    </CardContent>
                   
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ProfileHouses;
