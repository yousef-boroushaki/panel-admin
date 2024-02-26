import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PunchClockRoundedIcon from "@mui/icons-material/PunchClockRounded";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Typography } from "@mui/material";
import logo from "./images/Logo.png";
import { useRef } from "react";
import { useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [width, setWidth] = React.useState({
    winWidth: window.innerWidth
  });

  const detectSize = () => {
    setWidth({
      winWidth: window.innerWidth
    })
    console.log(width.winWidth)
    if(width.winWidth >= 1200 ){
          setOpen(!open)
    }else {
      setOpen(false)
    }
    
  }
  
  // useEffect(()=>{
  //   window.addEventListener('resize', detectSize)

  //   return () =>{
  //     window.addEventListener('resize', detectSize)
  //   }
  // },[width])
  

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ mx: open ? "auto" : 7, p: "50px 10px 25px 10px" }}>
          <IconButton onClick={detectSize} >
            {open ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar src={logo} sx={{ width: "42px", height: "42px" }} />{" "}
                <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
                  Base
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  mx: "auto",
                }}
              >
                <Avatar src={logo} sx={{ width: "42px", height: "42px" }} />{" "}
                <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
                  Base
                </Typography>
              </Box>
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Link
            to={"/"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GridViewRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to={"/analytics"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <InsertChartIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Analytics"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to={"/invoice"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Invoice"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to={"/schedule"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PunchClockRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Schedule"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to={"/calender"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Calender"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to={"/setting"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Setting"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to={"/login-register"}
            style={{ color: "black", textDecoration: "none" }}
            onMouseOver={(e) => {
              e.target.style.color = "blue";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "black";
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Logout"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
}
