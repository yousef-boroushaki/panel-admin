import React, { useEffect, useState } from "react";
import { Chart as ChartJs, Legend, plugins } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DataDoughnut from "./DataDoughnut.json";
import Data from "./Data.json";
import TopSell from "./TopSell.json";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
// import img from "./image/img1.jpg"
export default function Dashboard() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const use = useNavigate();
  useEffect(() => {
    let id = sessionStorage.getItem("id");
    if (id === "" || id === null) {
      use("/login-register");
    }
  }, []);
  const handleChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleChangeSecond = (event) => {
    setEndDate(event.target.value);
  };

  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = " bold 50px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${
          +data.datasets[0].data[0] +
          +data.datasets[0].data[1] +
          +data.datasets[0].data[2]
        }%`,
        centerX,
        centerY
      );
    },
  };


  return (
    <>
      <Box sx={{ bgcolor: "#f6f6f6", display: "flex" }}>
        <SideBar />
        <Box
          component={"main"}
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "#f6f6f6",
          }}
        >
          <Stack // header
            direction={"row"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
            variant="h5"
              sx={{
                width: "20px",
                fontWeight: "700",
              }}
            >
              Dashboard
            </Typography>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl
                  sx={{
                    width: "100%",
                    bgcolor: "#fff",
                    border: "1px solid white",
                    color: "#000",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Date</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={startDate}
                    label="Date"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>10-06-2021</MenuItem>
                    <MenuItem value={20}>10-7-2021</MenuItem>
                    <MenuItem value={30}>10-8-2021</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl
                  sx={{
                    width: "100%",
                    bgcolor: "#fff",
                    borderRadius: "8px",
                    borderColor: "#fff",
                    color: "#000",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Date</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={endDate}
                    label="Date"
                    onChange={handleChangeSecond}
                  >
                    <MenuItem value={10}>10-10-2021</MenuItem>
                    <MenuItem value={20}>10-11-2021</MenuItem>
                    <MenuItem value={30}>10-12-2021</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Stack>
          <Stack //boxes
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              display: {
                xl: "flex",
                lg: "flex",
                md: "none",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                padding: "20px 60px 20px 40px",
                borderRadius: "14px",
              }}
            >
              <Avatar
                sx={{ bgcolor: "#eae8ff", width: "55px", height: "55px" }}
              >
                <FavoriteRoundedIcon sx={{ color: "#5289ed" }} />
              </Avatar>
              <Stack>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  178+
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                  }}
                >
                  Save Products
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                padding: "20px 60px 20px 40px",
                borderRadius: "14px",
              }}
            >
              <Avatar
                sx={{ bgcolor: "#fefac4", width: "55px", height: "55px" }}
              >
                <SportsEsportsIcon sx={{ color: "#fbd810" }} />
              </Avatar>
              <Stack>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  20+
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                  }}
                >
                  Stock Products
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                padding: "20px 60px 20px 40px",
                borderRadius: "14px",
              }}
            >
              <Avatar
                sx={{ bgcolor: "#fff7df", width: "55px", height: "55px" }}
              >
                <ShoppingBagIcon sx={{ color: "#fdbc00" }} />
              </Avatar>
              <Stack>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  190+
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                  }}
                >
                  Sales Products
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                padding: "20px 60px 20px 40px",
                borderRadius: "14px",
              }}
            >
              <Avatar
                sx={{ bgcolor: "#eee6ff", width: "55px", height: "55px" }}
              >
                <BusinessCenterIcon sx={{ color: "#372cff" }} />
              </Avatar>
              <Stack>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  12+
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                  }}
                >
                  Job Application
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack
            sx={{
              mt: 3,
              gap: 3,
              // width: "100%",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              justifyContent:'space-between'
            }} //chart
          >
            <Box
              sx={{
                //chart
                width: {
                  xl: "60%",
                  lg: "60%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                maxWidth: {
                  xl: "60%",
                  lg: "60%",
                  md: "90%",
                  sm: "90%",
                  xs: "90%",
                },

                bgcolor: "#fff",
                borderRadius: "14px",
                padding: "20px",
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-evenly",
                // mx: "auto",
              }}
            >
              <Typography sx={{ mb: 2, fontWeight: "700" }}>Reports</Typography>

              <Line
                data={{
                  labels: [
                    "10am",
                    "11am",
                    "12am",
                    "01am",
                    "02am",
                    "03am",
                    "04am",
                    "05am",
                    "06am",
                    "07am",
                  ],
                  datasets: [
                    {
                      label: false,
                      data: [58, 25, 60, 38, 20, 43, 18, 38, 62, 58, 64],
                      fill: true,
                      segment: {
                        backgroundColor: "rgba(30,144,255,0.06)",
                      },
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.5, //line radious
                      borderColor: "blue",
                    },
                    point: {
                      backgroundColor: "white",
                      borderColor: "blue",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      min: 0,
                      max: 100,
                      ticks: {
                        stepSize: 20,
                      },
                      grid: {
                        borderWidth: 0,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                        // drawOnChartArea:false
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      // title
                      display: false,
                    },
                  },
                }}
              />
            </Box>
            <Box //doughnut chart
              sx={{
                width: {
                  xl: "40%",
                  lg: "40%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                maxWidth: {
                  xl: "30%",
                  lg: "30%",
                  md: "90%",
                  sm: "90%",
                  xs: "90%",
                },
                bgcolor: "#fff",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <Typography sx={{ mb: 2, fontWeight: "700" }}>
                Analytics
              </Typography>
              <Doughnut
                data={{
                  labels: DataDoughnut.map((data) => data.labels),
                  datasets: [
                    {
                      label: "",
                      data: DataDoughnut.map((data) => data.value),
                      backgroundColor: DataDoughnut.map(
                        (data) => data["backGroundColor "]
                      ),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
                plugins={[doughnutLabel]}
              />
            </Box>
          </Stack>
          <Stack
            sx={{
              mt: 3,
              // mx: 2,
              gap: 3,
              // width: "100%",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              justifyContent:'space-between'
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                width: {
                  xl: "60%",
                  lg: "60%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                maxWidth: {
                  xl: "60%",
                  lg: "60%",
                  md: "90%",
                  sm: "90%",
                  xs: "90%",
                },
                padding: "20px",
                borderRadius: "12px",
                bgcolor: "#fff",
              }}
            >
              <Typography component={"h2"} sx={{ fontWeight: "700" }}>
                Recent Orders
              </Typography>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Tracking no</TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Total Order</TableCell>
                    <TableCell align="center">Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Data.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {data.TrackingNo}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar src={data.Image} />
                        {data.ProductName}
                      </TableCell>
                      <TableCell align="center">{data.Price}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            color: "#1c85ed",
                            bgcolor: "#e3f2fe",
                            borderRadius: "6px",
                            padding: "5px 0",
                            width: "70px",
                            display: "flex",
                            justifyContent: "center",
                            mx: "auto",
                          }}
                        >
                          {data.TotalOrder}
                        </Box>
                      </TableCell>
                      <TableCell align="center">{data.TotalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                width: {
                  xl: "40%",
                  lg: "40%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                maxWidth: {
                  xl: "30%",
                  lg: "30%",
                  md: "90%",
                  sm: "90%",
                  xs: "90%",
                },
              }}
            >
              <Typography sx={{ fontWeight: "700" }}>
                Top Selling Product
              </Typography>
              <Stack
                sx={{
                  flexDirection: {
                    xl: "column",
                    lg: "column",
                    md: "row",
                    sm: "row",
                    xs: "row",
                  },
                  justifyContent: {
                    md: "space-around",
                    sm: "space-around",
                    xs: "space-around",
                  },
                }}
              >
                {TopSell.map((data, index) => (
                  <Stack direction={"row"} sx={{ gap: 4, mt: 3 , borderBottom:'1px solid rgba(0,0,0,.1)', pb:2}} key={index}>
                    <Box
                      sx={{
                        borderRadius: "6px",
                       
                      }}
                    >
                      <img src={data.TopSellingProductImage} alt="img" style={{width:'96px', height:'96px'}}/>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="p" sx={{ fontSize: "16px" }}>
                        {data.TopSellingProductName}
                      </Typography>
                      <Rating value={data.TopSellingProductRate} readOnly />
                      <Typography variant="p" sx={{ fontWeight: "600", mb: 2 }}>
                        {data.TopSellingProductPrice}
                      </Typography>
                    </Box>                   
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
