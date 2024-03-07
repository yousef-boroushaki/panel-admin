import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import thumsUp from "./image/thumbs-up.png";
import ellipse from "./image/Ellipse 24.png";
import illustration from "./image/Illustration.png";

export default function NewAccount() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#f6f6f6",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            width: "700px",
            height: "90vh",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            position: "relative",
          }}
        >
          <img
            src={illustration}
            alt=""
            style={{
              position: "absolute",
              top:150,
            }}
          />

          <Box>
            <img src={ellipse} alt="" />
            <Box>
              <img src={thumsUp} alt=""    style={{
              position: "absolute",
              top:220,
              left:310
            }} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Your account successfully created.
          </Typography>
          <Link to={"/login-register"}>
            <Button
              variant="contained"
              sx={{
                padding: "10px 30px",
                borderRadius: "10px",
              }}
            >
              Go to Login
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
