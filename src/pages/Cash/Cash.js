import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import picback from "../../images/foto8.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const images = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/1000_USD_note%3B_series_of_1934%3B_obverse.jpg/1200px-1000_USD_note%3B_series_of_1934%3B_obverse.jpg",
    width: "78%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  height: 500,
  margin: "25px",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
  border: "4px solid white",
  boxShadow: "9px 30px 20px rgba(0,0,0,1)",
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.white,
  opacity: 0,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  const { profile, getMyProfile, reload, setReload } = useContext(AuthContext);

  const handleGetCash = async () => {
    let response;
    try {
      response = await axios.patch(
        `http://localhost:3001/users/addbalance`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success("tu balance ha sido actualizado");
      }

      setReload(!reload);
      getMyProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${picback})`,
        backgroundSize: "100% 100%",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 300,
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "lime",
            fontSize: "60px",
            fontWeight: "500",
            height: "5%",
            letterSpacing: "10px",
            fontFamily: "Courier, monospace",
          }}
        >
          {profile.balance}$
        </div>

        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={handleGetCash}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </div>
  );
}
