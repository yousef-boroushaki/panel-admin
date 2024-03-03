import { Visibility, VisibilityOff } from "@mui/icons-material";
import useFormField from "../../../utils/useFormFields";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import loginImg from "./image/login.png";
import {
  Box,
  Paper,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  FilledInput,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./image/Logo.png";
import googleLogo from "./image/googleLogo.png";
import faceBookLogo from "./image/faceBookLogo.png";
import { useFormik } from "formik";

export default function Login({ handlePage }) {
  const use = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [fields, handleChange] = useFormField();
  const [data, setData] = useState();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = (i) => {
    i.preventDefault();
    // console.log(items)

    fetch("http://localhost:3000/user/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        if (Object.keys(resp).length === 0) {
          toast.console.error("Please enter valid username");
        } else {
          if (resp.password === password) {
            toast.success("Success");
            sessionStorage.setItem("id", id);
            use("/");
          } else {
            toast.console.error("Please enter valid password");
          }
        }
      })
      .catch((err) => {
        toast.error("Login Failed due to :");
      });
  };
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
          height: "750px",
        }}
      >
        <Box
          sx={{
            width: { xl: "30%", lg: "40%", md: "50%", sm: "70%" },
          }}
        >
          <Grid>
            <CssBaseline />
            <Grid item xs={false} sm={2} md={3} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
              sx={{
                background: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    color: "rgb(60,118,210)",
                    mb: 2,
                    width: "70px",
                    height: "70px",
                  }}
                  src={logo}
                />
                <Typography component="h1" variant="h5">
                  Log in
                </Typography>
                <Stack direction="row" sx={{ gap: 4, mt: 3 }}>
                  <Button
                    variant="text"
                    sx={{
                      padding: "10px 35px",
                      borderRadius: "8px",
                      color: "black",
                      bgcolor: "#f0f0f0",
                      gap: 1,
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
                      gap: 1
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
                <Box
                  component="form"
                  // onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, width: "100%" }}
                >
                  <Typography>User Name</Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={(i) => setId(i.target.value)}
                    id="identifier"
                    label="Full Name"
                    name="username"
                    value={id}
                    autoFocus
                    variant="filled"
                    sx={{ color: "white", bgColor: "#f0f0f0" }}
                  />
                  <Typography sx={{ mt: "15px" }}>Password</Typography>
                  <FormControl sx={{ mt: "15px" }} fullWidth variant="filled">
                    <InputLabel>password</InputLabel>
                    <FilledInput
                      onChange={(i) => setPassword(i.target.value)}
                      fullWidth
                      value={password}
                      required
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
                  <Stack
                    direction={"row"}
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Link style={{ fontSize: "15px" }}>Reset Password?</Link>
                  </Stack>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        Don't have an account?
                        <Link onClick={handlePage}>Sign up</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            width: { md: "70%", sm: "0", xs: "0" },
            height: "750px",
            mt: 1,
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f6f6f6",
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
            src={loginImg}
            alt="img"
            style={{ height: "auto", width: "500px" }}
          />
        </Box>
      </Box>
    </>
  );
}
