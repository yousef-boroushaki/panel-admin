import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import DataAnalytics from "./DataAnalytics.json";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SideBar from "../../components/SideBar";

export default function Analytics() {
  const [rows, setRows] = useState(DataAnalytics);
  const [selectedRow, setSelectedRow] = useState("");
  const [open, setOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null); // check number of the row that we wanna edit

  let defaultValue = rowToEdit !== null && rows[rowToEdit]; //check value of the row that we wanna edit

  const [formState, setFormState] = useState(
    defaultValue || {
      Name: "",
      Email: "",
      phone: "",
      Gender: "",
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
      formState.Name &&
      formState.Email &&
      formState.phone &&
      formState.Gender
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

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleSelected = (targetIndex) => {
    rows.map((e, index) => {
      if (index === targetIndex) {
        setSelectedRow(e);
      }
    });
  };

  const firstDoughnutLabel = {
    id: "firstDoughnutLabel",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = " bold 20px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`70`, centerX, centerY);
    },
  };
  const secondDoughnutLabel = {
    id: "secondDoughnutLabel",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = " bold 20px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`60`, centerX, centerY);
    },
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "300px",
        mt: "45px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Avatar sx={{ width: "80px", height: "80px" }} />
        <Typography variant="h6">{selectedRow.Name}</Typography>
        <Typography color={"GrayText"}>{selectedRow.job}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 1,
          padding: "10px 20px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Contact Info
        </Typography>
        <Stack>
          <Typography
            color={"GrayText"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              padding: "10px",
              width: "100%",
            }}
          >
            <MailIcon />
            {selectedRow.Email}
          </Typography>
        </Stack>
        <Divider />
        <Typography
          color={"GrayText"}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            padding: "10px",
          }}
        >
          <PhoneIcon /> {selectedRow.phone}
        </Typography>
        <Divider />
        <Typography
          color={"GrayText"}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            padding: "10px",
          }}
        >
          <LocationOnIcon /> {selectedRow.Address}
        </Typography>
        <Divider />
        {/* ************************************* bar chart ***************************************8 */}
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,.1)",
            padding: 2,
            borderRadius: "8px",
            width: "250px",
          }}
        >
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Performance</Typography>
          <Bar
            // width={'400px'}
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  // label:'369',
                  data: [1.6, 2.3, 2.5, 2.1, 3, 3.5],
                  backgroundColor: [
                    "#fce3ca",
                    "#ff8103",
                    "#fce3ca",
                    "#fce3ca",
                    "#fce3ca",
                    "#fce3ca",
                  ],
                  borderRadius: 8,
                  barThickness: 10,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    display: false,
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </Box>
        <Stack direction={"row"} width={"100%"} gap={2}>
          <Box
            sx={{
              width: "45%",
              padding: 1,
              border: "1px solid rgba(0,0,0,.1)",
              borderRadius: "8px",
            }}
          >
            <Doughnut
              data={{
                labels: "",
                datasets: [
                  {
                    label: "",
                    data: [70, 30],
                    backgroundColor: ["#ffd103", "#fff"],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              plugins={[firstDoughnutLabel]}
            />
          </Box>
          <Box
            sx={{
              width: "45%",
              padding: 1,
              border: "1px solid rgba(0,0,0,.1)",
              borderRadius: "8px",
            }}
          >
            <Doughnut
              data={{
                labels: "",
                datasets: [
                  {
                    label: "",
                    data: [60, 40],
                    backgroundColor: ["#031cfc", "#fff"],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              plugins={[secondDoughnutLabel]}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
    <Box sx={{bgcolor: "#f6f6f6",display:'flex', width:'100%'}}>
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
              Customer List
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              {" "}
              Add Customer
            </Button>
          </Stack>
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
                  <Typography variant="h6">Add Customer</Typography>
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
                    <CameraAltIcon
                      sx={{ color: "#070617" }}
                      fontSize="medium"
                    />
                  </Avatar>
                </Stack>
                <Stack mt={3}>
                  <FormControl>
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
                    </Stack>
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
                    </Stack>{" "}
                    <Stack gap={1} margin="10px 25px">
                      <Typography color="black" variant="p">
                        Phone Number
                      </Typography>
                      <TextField
                        sx={{
                          backgroundColor: "#ededf2",
                        }}
                        value={formState.phone}
                        name="phone"
                        onChange={handleAddCustomer}
                      ></TextField>
                    </Stack>
                    <Stack gap={1} margin="10px 25px">
                      <Typography color="black" variant="p">
                        Gender
                      </Typography>
                      <TextField
                        sx={{
                          backgroundColor: "#ededf2",
                        }}
                        value={formState.Gender}
                        name="Gender"
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

          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mx: 5,
                  }}
                >
                  Name <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid item lg={2}>
                <Typography
                  sx={{
                    display: {
                      lg: "flex",
                      md: "none",
                      sm: "none",
                      xs: "none",
                    },
                    alignItems: "center",
                  }}
                >
                  Email <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid item lg={2}>
                <Typography
                  sx={{
                    display: {
                      lg: "flex",
                      md: "flex",
                      sm: "flex",
                      xs: "none",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Phone number <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid item lg={2}>
                <Typography
                  sx={{
                    display: {
                      lg: "flex",
                      md: "none",
                      sm: "none",
                      xs: "none",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Gender <ArrowDropDownIcon />
                </Typography>
              </Grid>
              <Grid item lg={2}>
                <Typography
                  sx={{
                    display: {
                      lg: "flex",
                      md: "flex",
                      sm: "flex",
                      xs: "none",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#f6f6f6",
                  }}
                >
                  Name <ArrowDropDownIcon />
                </Typography>
              </Grid>
            </Grid>
            {rows.map((data, index) => (
              <Stack
                direction={"row"}
                onClick={() => handleSelected(index)}
                key={index}
              >
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
                >
                  <Grid item xs={6} sm={4} md={4} lg={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar src={data.Image} /> {data.Name}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={2}
                    sx={{
                      display: {
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      },
                      textAlign: "start",
                    }}
                  >
                    <Box>{data.Email}</Box>
                  </Grid>
                  <Grid item sm={3} md={3} lg={2}>
                    <Box
                      sx={{
                        display: {
                          lg: "block",
                          md: "block",
                          sm: "block",
                          xs: "none",
                        },
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      {data.phone}
                    </Box>
                  </Grid>
                  <Grid item sm={1} md={1} lg={2}>
                    <Box
                      sx={{
                        width: "30%",
                        textAlign: "center",
                        padding: 1,
                        mx: "auto",
                        display: {
                          lg: "flex",
                          md: "none",
                          sm: "none",
                          xs: "none",
                        },
                        justifyContent: "center",
                        borderRadius: "16px",
                        bgcolor: data.Gender === "male" ? "#e0e7ff" : "#ffebcf",
                        color: data.Gender === "male" ? "#0554e8" : "#e88905",
                      }}
                    >
                      {data.Gender}
                    </Box>
                  </Grid>
                  <Grid item sm={1} md={1} lg={1}>
                    <Button
                      sx={{
                        width: "50%",
                        bgcolor: "#e0e7ff",
                        mx: "auto",
                        borderRadius: "16px",
                        py: 1,
                      }}
                      onClick={toggleDrawer("right", true)}
                    >
                      more
                    </Button>
                  </Grid>
                  <Grid item sm={1} md={1} lg={1}>
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
                      <EditIcon color="info" />
                    </Button>
                  </Grid>
                  <Grid item sm={1} md={1} lg={1}>
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
              </Stack>
            ))}
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

// versige floor 1   P 304
