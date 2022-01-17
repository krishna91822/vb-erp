import "./SidebarNavigation.module.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GridViewIcon from "@mui/icons-material/GridView";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import UseRoles from "../../helpers/roles";

const boxStyles = {
  position: "fixed",
  top: "70px",
  left: "0",
  height: "100vh",
  backgroundColor: "white",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};
const listStyles = {
  width: "250px",
  height: "100%",
  maxWidth: "250px",
  bgcolor: "white",
  color: "black",
};
const paperStyles = {
  padding: 0,
  margin: 0,
  width: "250px",
  maxHeight: "90%",
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&:hover": {
    overflowY: "scroll",
  },
};
const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#EFEFEF",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#EFEFEF",
  },
}));
const SidebarNavigation = () => {
  const [openTasks, setOpenTasks] = useState(false);
  const [openPMO, setOpenPMO] = useState(false);
  const [openCMS, setOpenCMS] = useState(false);
  const [openRR, setOpenRR] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };
  const handleClickTasks = (event) => {
    setOpenTasks(!openTasks);
  };
  const handleClickPMO = (event) => {
    setOpenPMO(!openPMO);
  };
  const handleClickCMS = (event) => {
    setOpenCMS(!openCMS);
  };
  const handleClickRR = (event) => {
    setOpenRR(!openRR);
  };

  const {
    isUser,
    isApprover,
    isLeader,
    isHrAdmin,
    isFinanceAdmin,
    isPMSAdmin,
    isSuperAdmin,
  } = UseRoles();

  const sideMenu = [
    {
      name: "My Profile",
      link: "/my-profile",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      name: "Tasks",
      dropDown: [
        {
          name: "Create Profile",
          link: "/create-profile",
          access: [isHrAdmin, isSuperAdmin].some((x) => x),
        },
        {
          name: "Reviews",
          link: "/reviews",
          access: [
            isApprover,
            isLeader,
            isHrAdmin,
            isFinanceAdmin,
            isPMSAdmin,
            isSuperAdmin,
          ].some((x) => x),
        },
      ],
      open: openTasks,
      handle: handleClickTasks,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      name: "My Colleagues",
      link: "/network",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      name: "Status",
      link: "/status",
      access: [isUser].some((x) => x),
    },
    {
      name: "CIMS",
      link: "/cims",
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      name: "PMO",
      dropDown: [
        {
          name: "Projects",
          link: "/pmo/projects",
          access: [
            isApprover,
            isLeader,
            isHrAdmin,
            isFinanceAdmin,
            isPMSAdmin,
            isSuperAdmin,
          ].some((x) => x),
        },
        {
          name: "Create Projects",
          link: "/pmo/projects/create",
          access: [isApprover, isLeader, isPMSAdmin, isSuperAdmin].some(
            (x) => x
          ),
        },
        {
          name: "Allocations",
          link: "/pmo/allocations",
          access: [
            isApprover,
            isLeader,
            isHrAdmin,
            isFinanceAdmin,
            isPMSAdmin,
            isSuperAdmin,
          ].some((x) => x),
        },
      ],
      open: openPMO,
      handle: handleClickPMO,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },

    {
      name: "CMS",
      dropDown: [
        {
          name: "PO/SOW",
          link: "/posow",
          access: [
            isApprover,
            isLeader,
            isHrAdmin,
            isFinanceAdmin,
            isPMSAdmin,
            isSuperAdmin,
          ].some((x) => x),
        },
        {
          name: "Invoicing",
          link: "/invoices",
          access: [
            isApprover,
            isLeader,
            isHrAdmin,
            isFinanceAdmin,
            isPMSAdmin,
            isSuperAdmin,
          ].some((x) => x),
        },
      ],
      open: openCMS,
      handle: handleClickCMS,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      name: "R&R",
      dropDown: [
        {
          name: "Reward",
          link: "/rewards",
          access: [isLeader, isHrAdmin, isSuperAdmin].some((x) => x),
        },
      ],
      open: openRR,
      handle: handleClickRR,
      access: [isLeader, isHrAdmin, isSuperAdmin].some((x) => x),
    },
  ];
  return (
    <Box sx={boxStyles}>
      <Paper sx={paperStyles} elevation={0}>
        <List sx={listStyles} component="nav">
          <Grid paddingY="20px" container justifyContent="center">
            <Avatar style={{ width: "80px", height: "80px" }} />
          </Grid>
          {sideMenu.map((menuItem, i) => {
            if (!menuItem.dropDown) {
              return (
                menuItem.access && (
                  <CustomListItemButton
                    component={Link}
                    to={menuItem.link}
                    selected={selectedIndex === i}
                    onClick={() => handleListItemClick(i)}
                  >
                    <ListItemIcon>
                      <DonutLargeIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary={menuItem.name} />
                  </CustomListItemButton>
                )
              );
            } else {
              return (
                menuItem.access && (
                  <>
                    <CustomListItemButton
                      onClick={() => {
                        menuItem.handle();
                        handleListItemClick(i);
                      }}
                      id={i}
                      selected={selectedIndex === i}
                    >
                      <ListItemIcon>
                        <DonutLargeIcon style={{ color: "black" }} />
                      </ListItemIcon>
                      <ListItemText primary={menuItem.name} />
                      {menuItem.open ? <ExpandLess /> : <ExpandMore />}
                    </CustomListItemButton>
                    <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {menuItem.dropDown.map(
                          (item) =>
                            item.access && (
                              <CustomListItemButton
                                component={Link}
                                to={item.link}
                                sx={{ pl: 4 }}
                              >
                                <ListItemIcon>
                                  <GridViewIcon style={{ color: "black" }} />
                                </ListItemIcon>
                                <ListItemText
                                  style={{ color: "black" }}
                                  primary={item.name}
                                />
                              </CustomListItemButton>
                            )
                        )}
                      </List>
                    </Collapse>
                  </>
                )
              );
            }
          })}
        </List>
      </Paper>
    </Box>
  );
};
export default SidebarNavigation;
