import { Visibility, VisibilityOff } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import signUp from "./image/sign-up.png";
import React, { useState } from "react";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import logo from "./image/Logo.png";
import faceBookLogo from './image/faceBookLogo.png'
import googleLogo from './image/googleLogo.png'

export default function Register({ handlePage }) {
  const use = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (i) => {
    i.preventDefault();
    let items = { id, email, fullName, password };

    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(items),
    })
      .then((res) => {
        use("/new-account");
      })
      .catch((err) => {
        alert("Register failed");
      });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            background: "#fff",
            borderRadius: "16px",
            padding: "10px 80px",
            width: { xl: "30%", lg: "40%", md: "50%", sm: "70%" },
          }}
        >
          <Avatar
            sx={{
              color: "rgb(60,118,210)",
              mb: 2,
              width:'70px',
              height:'70px'
            }}
            src={logo}
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Stack direction="row" sx={{ gap: 4, mt: 3 }}>
            <Button
              variant="text"
              sx={{
                padding: "10px 35px",
                borderRadius: "8px",
                color: "black",
                bgcolor: "#f0f0f0",
                gap:1
              }}
            >
              <img src={googleLogo} alt="" />
              Google
            </Button>
            <Button
              variant="text"
              sx={{
                padding: "10px 30px",
                borderRadius: "8px",
                color: "black",
                bgcolor: "#f0f0f0",
                gap:1
              }}
            >
              <img src={faceBookLogo} alt="" />
              Facebook
            </Button>
          </Stack>
          <Stack direction={"row"} sx={{ gap: 2, my: 2 }}>
            <Typography sx={{ color: "#f0f0f0", fontWeight: "700" }}>
              _________________
            </Typography>
            <Typography sx={{ mt: 1 }}>Or</Typography>
            <Typography sx={{ color: "#f0f0f0", fontWeight: "700" }}>
              _________________
            </Typography>
          </Stack>
          <Box component="form" noValidate sx={{ mt: 1, width: "110%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Full Name</Typography>
                <TextField
                  value={fullName}
                  autoComplete="username"
                  name="FullName"
                  required
                  fullWidth
                  onChange={(i) => setFullName(i.target.value)}
                  label="Full Name"
                  autoFocus
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Email Address</Typography>
                <TextField
                  value={email}
                  required
                  fullWidth
                  onChange={(i) => setEmail(i.target.value)}
                  id="email"
                  label="example@gmail.com"
                  name="email"
                  autoComplete="email"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>User Name</Typography>
                <TextField
                  value={id}
                  required
                  fullWidth
                  onChange={(i) => setId(i.target.value)}
                  id="identifier"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ mt: "5px" }}>Password</Typography>
                <FormControl fullWidth sx={{ mt: "5px" }} variant="filled">
                  <InputLabel>Password</InputLabel>
                  <FilledInput
                    fullWidth
                    required
                    value={password}
                    onChange={(i) => setPassword(i.target.value)}
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Link to={"/new-account"}>
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
            </Link>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Typography sx={{ fontSize: "14px" }}>
                  Already have an account?
                  <Link onClick={handlePage}>Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            width: { md: "70%", sm: "0", xs: "0" },
            height: "750px",
            mt: 1,
            justifyContent:'center',
            alignItems:'center',
            bgcolor:"#f6f6f6",
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
          }}
        >
          <img
            src={signUp}
            alt="image"
            style={{ height: "auto", width: "500px" }}
          />
        </Box>
      </Box>
    </>
  );
}
