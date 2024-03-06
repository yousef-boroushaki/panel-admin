import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import InvoiceData from "./InvoiceData.json";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";

export default function Invoice() {
  const [value, setValue] = React.useState(2);

  const [rows, setRows] = useState(InvoiceData);

  const [open, setOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null); // check number of the row that we wanna edit

  let defaultValue = rowToEdit !== null && rows[rowToEdit]; //check value of the row that we wanna edit

  const [formState, setFormState] = useState(
    defaultValue || {
      Id:"",
      Name: "",
      Email: "",
      Date: "",
      Status: "",
    }
  );

  const [error, setError] = useState("");

  const handleEditRow = (index) => {
    setRowToEdit(index);

    handleOpen();
  };

  const handleAddCustomer = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateModalForm = () => {
    if (
      formState.Id &&
      formState.Name &&
      formState.Email &&
      formState.Date &&
      formState.Status
    ) {
      setError("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setError(errorFields.join(", "));
      return false;
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!validateModalForm()) return;

    handleAddModalValue(formState);
    handleClose();
  };

  const handleAddModalValue = (newRow) => {
    rowToEdit === null // check the modal is open for edit or not
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  return (
    <>
      <Box sx={{ bgcolor: "#f6f6f6", display: "flex", width: "100%" }}>
        <SideBar />
        <Box
          component={"main"}
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "#f6f6f6",
          }}
        >
          <Stack
            direction="row"
            sx={{
              padding: "15px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Invoice List
            </Typography>
            <Stack direction="row" gap={2}>
              {" "}
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                  borderRadius: "10px",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Link to={"/invoice/new-invoice"}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ py: 1, textDecoration: "none" }}
                >
                  {" "}
                  Add New
                </Button>
              </Link>
            </Stack>
          </Stack>

          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs
                lg={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx:{
                    lg:0,
                    md:3,
                    sm:3
                  }
                }}
              >
                <Checkbox />
              </Grid>
              <Grid
                item
                xs
                lg={1}
                md={2}
                sm={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Invoice Id <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                md={3}
                xs
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    lg:'center',
                    md:'start'
                  },
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Name <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid
                item
                xs
                lg={2}
                sx={{
                  display: {
                    lg: "flex",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Email <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                md={3}
                xs
                sx={{
                  display: {
                    lg: "flex",
                    md: "flex",
                    sm: "none",
                    xs: "none",
                  },
                  alignItems: "center",
                  justifyContent: {
                    lg:"center",
                    md:'start'
                  },
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Date <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid
                item
                xs
                lg={2}
                sx={{
                  display: {
                    lg: "flex",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Status <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid item lg={1} xs>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <DeleteIcon /> */}
                </Typography>
              </Grid>
            </Grid>
            {rows.map((data, index) => (
              <Grid
                container
                sx={{
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translate(0, -5px)",
                  },
                  transition: "all 0.2s ease-in-out ",
                }}
                key={index}
              >
                <Grid item xs lg={1}>
                  <Box
                    sx={{
                      textAlign: "center",
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mx: 1,
                    }}
                  >
                    <Checkbox />
                  </Box>
                </Grid>
                <Grid item xs xs={2} sm={3} md={2} lg={1}>
                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                    }}
                  >
                    <Typography>{data.InvoiceId}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs xs={3} sm={3} md={3} lg={2}>
                  <Stack
                    direction="row"
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: 1,
                    }}
                  >
                    <Avatar /> <Typography>{data.Name}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs lg={2}>
                  <Stack
                    sx={{
                      display: {
                        lg: "flex",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      },
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: 1,
                    }}
                  >
                    <EmailIcon sx={{ color: "#016904", fontSize: "15px" }} />{" "}
                    <Typography>{data.Email}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs md={2} lg={2}>
                  <Stack
                    sx={{
                      display: {
                        lg: "flex",
                        md: "flex",
                        sm: "none",
                        xs: "none",
                      },
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: {
                        lg:'center',
                        md:'start'
                      },
                    }}
                  >
                    <CalendarMonthIcon
                      sx={{ color: "#3da5ff", fontSize: "15px" }}
                    />{" "}
                    {data.Date}
                  </Stack>
                </Grid>
                <Grid item xs lg={2}>
                  <Box
                    sx={{
                      display: {
                        lg: "flex",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      },
                      width: "30%",
                      textAlign: "center",
                      padding: "10px 60px",
                      mx: "auto",
                      justifyContent: "center",
                      borderRadius: "20px",
                      bgcolor:
                        data.Status === "Complete"
                          ? "#e6f0f7"
                          : data.Status === "Pending"
                          ? "#fcd8ac"
                          : "#f2dada",
                      color:
                        data.Status === "Complete"
                          ? "#036e01"
                          : data.Status === "Pending"
                          ? "#fa730c"
                          : "#d60d02",
                    }}
                  >
                    <Typography>{data.Status}</Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      width: "50%",
                      bgcolor: "#e0e7ff",
                      mx: "auto",
                      borderRadius: "16px",
                      py: 1,
                    }}
                    onClick={() => handleEditRow(index)}
                  >
                    <EditIcon />
                  </Button>
                </Grid>
                <Grid
                  item
                  lg={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      width: "50%",
                      bgcolor: "#ffd8ce",
                      mx: "auto",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "16px",
                      py: 1,
                    }}
                    onClick={() => handleDeleteRow(index)}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>

      {/* **************************MODAL********************* */}

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              // backgroundColor: "yellow",
            }}
          >
            <Stack
              direction="row"
              padding="15px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Edit Customer</Typography>
              <Button onClick={handleClose}>
                <CloseIcon
                  fontSize="medium"
                  sx={{
                    backgroundColor: "#fceded",
                    borderRadius: "50%",
                    color: "#fa2d2d",
                    padding: "5px",
                  }}
                />
              </Button>
            </Stack>
            <Stack
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#ededf2",
                }}
              >
                <CameraAltIcon sx={{ color: "#070617" }} fontSize="medium" />
              </Avatar>
            </Stack>
            <Stack mt={3}>
              <FormControl>
                <Stack gap={1} margin="10px 25px">
                  <Typography color="black" variant="p">
                    Invoice Id
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#ededf2",
                    }}
                    value={formState.Id}
                    name="Id"
                    onChange={handleAddCustomer}
                  ></TextField>
                </Stack>
                <Stack gap={1} margin="10px 25px">
                  <Typography color="black" variant="p">
                    Name
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#ededf2",
                    }}
                    value={formState.Name}
                    name="Name"
                    onChange={handleAddCustomer}
                  ></TextField>
                </Stack>{" "}
                <Stack gap={1} margin="10px 25px">
                  <Typography color="black" variant="p">
                    Email
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#ededf2",
                    }}
                    value={formState.Email}
                    name="Email"
                    onChange={handleAddCustomer}
                  ></TextField>
                </Stack>
                <Stack gap={1} margin="10px 25px">
                  <Typography color="black" variant="p">
                    Date
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#ededf2",
                    }}
                    value={formState.Date}
                    name="Date"
                    onChange={handleAddCustomer}
                  ></TextField>
                </Stack>
                <Stack gap={1} margin="10px 25px">
                  <Typography color="black" variant="p">
                    Status
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#ededf2",
                    }}
                    value={formState.Status}
                    name="Status"
                    onChange={handleAddCustomer}
                  ></TextField>
                </Stack>
              </FormControl>
              {error && (
                <Typography
                  color={"error"}
                  sx={{ mx: "auto" }}
                >{`Please Include: ${error}`}</Typography>
              )}
              <Button
                variant="contained"
                sx={{ width: "50%", mx: "auto", my: 2 }}
                onClick={handleAddSubmit}
              >
                submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
