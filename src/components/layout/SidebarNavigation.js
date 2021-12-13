import { useState } from "react";
import "./SidebarNavigation.module.css";

import { useNavigate } from "react-router-dom";

import {
  Box,
  List,
  Paper,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Grid,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GridViewIcon from "@mui/icons-material/GridView";

import { styled } from "@mui/material/styles";

const boxStyles = {
  position: "sticky",
  overflowY: "scroll",
  top: "70px",
  width: "100%",
  height: "calc(100vh - 70px)",
  backgroundColor: "white",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
};

const listStyles = {
  bgcolor: "white",
  color: "black",
};

const paperStyles = {
  padding: 0,
  margin: 0,
};

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#efefef",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#efefef",
  },
}));

const SidebarNavigation = (props) => {
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("my-profile");
  const [openSubMenu, setOpenSubMenu] = useState({
    tasks: false,
    pmo: false,
    cms: false,
    randr: false,
  });

  const sideMenu = [
    {
      label: "My Profile",
      name: "my-profile",
      url: "/my-profile",
    },
    {
      label: "Tasks",
      name: "tasks",
      subMenu: [
        {
          label: "Create Profile",
          name: "create-profile",
          url: "/create-profile",
        },
        {
          label: "Reviews",
          name: "reviews",
          url: "/reviews",
        },
      ],
    },
    { label: "Network", name: "network", url: "/network" },
    {
      label: "Contract Mgmt",
      name: "contract-management",
      url: "/contract-management",
    },
    {
      label: "PMO",
      name: "pmo",
      subMenu: [
        {
          label: "Projects",
          name: "projects",
          url: "/projects",
        },
        {
          label: "Create Project",
          name: "create-project",
          url: "/create-project",
        },
        {
          label: "Allocations",
          name: "allolcations",
          url: "/allocations",
        },
      ],
    },
    { label: "CIMS", name: "cims", url: "/cims" },
    {
      label: "CMS",
      name: "cms",
      subMenu: [
        {
          label: "PO/SOW",
          name: "po-sow",
          url: "/po-sow",
        },
        {
          label: "Invoicing",
          name: "invoicing",
          url: "/invoicing",
        },
      ],
    },
    {
      label: "R&R",
      name: "randr",
      subMenu: [
        {
          label: "Catalog",
          name: "catalog",
          url: "/catalog",
        },
        {
          label: "Reward",
          name: "reward",
          url: "/reward",
        },
      ],
    },
  ];

  const handleMenuClick = (item) => {
    setSelectedMenu(item.name);
    navigate(`${item.url}`);
  };
  const handleSubMenuClick = (item) => {
    setSelectedMenu(item.name);
    navigate(`${item.url}`);
  };

  const renderChidMenu = (childMenu) => {
    return childMenu.subMenu.map((item, i) => (
      <CustomListItemButton
        sx={{ pl: 4 }}
        key={i}
        selected={selectedMenu === item.name}
        onClick={() => handleSubMenuClick(item)}
      >
        <ListItemIcon>
          <GridViewIcon style={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </CustomListItemButton>
    ));
  };

  return (
    <Box sx={boxStyles}>
      <Paper sx={paperStyles} elevation={0}>
        <List sx={listStyles} component="nav">
          <Grid paddingY="20px" container justifyContent="center">
            <Avatar style={{ width: "80px", height: "80px" }} />
          </Grid>

          {sideMenu.map((menuItem, i) => {
            const { name, label } = menuItem;

            return !menuItem.subMenu ? (
              <CustomListItemButton
                key={i}
                selected={selectedMenu === name}
                name={name}
                onClick={() => {
                  handleMenuClick(menuItem);
                }}
              >
                <ListItemIcon>
                  <DonutLargeIcon style={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </CustomListItemButton>
            ) : (
              <div key={i}>
                <CustomListItemButton
                  onClick={() => {
                    setOpenSubMenu({
                      ...openSubMenu,
                      [name]: !openSubMenu[name],
                    });
                  }}
                  id={i}
                >
                  <ListItemIcon>
                    <DonutLargeIcon style={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary={menuItem.label} />
                  {openSubMenu[name] ? <ExpandLess /> : <ExpandMore />}
                </CustomListItemButton>
                <Collapse in={openSubMenu[name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {renderChidMenu(menuItem)}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default SidebarNavigation;
