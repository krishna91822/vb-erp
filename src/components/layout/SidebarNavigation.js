import Box from "@mui/material/Box";
import { useState } from "react";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GridViewIcon from "@mui/icons-material/GridView";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import UseRoles from "../../helpers/roles";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import vbLogo from "../../assets/images/vb_logo.svg";
import "../../assets/styles/imageStyles.css";

const boxStyles = {
  position: "fixed",
  // top: "70px",
  // left: "0",
  height: "100vh",
  backgroundColor: "white",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};

const customStyles = {
  image: {
    width: "150px",
    marginRight: "65px",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "25px",
    borderRadius: "10px",
    filter: "grayscale(30%)",
  },
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
  "&.MuiListItemButton-root:hover": {
    backgroundColor: "rgb(18 28 42)",
  },

  ".MuiTypography-root": {
    fontFamily:
      "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    fontWeight: "600",
    lineHeight: "1.75",
  },

  ".MuiSvgIcon-root ": {
    color: "rgb(156,163,175)",
  },

  "&.Mui-selected": {
    backgroundColor: "rgb(36,42,56)",
    borderRadius: ".4rem",
    marginLeft: ".5rem",
    marginRight: ".5rem",
    ".MuiTypography-root": {
      color: "rgb(210,79,31)",
      fontWeight: "600",
      lineHeight: "1.75",
    },
    ".MuiSvgIcon-root": {
      color: "rgb(210,79,31)",
    },
  },
  "&.Mui-selected:hover": {
    backgroundColor: "rgb(36,42,56)",
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
      icon: <PersonIcon />,
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
      icon: <AssignmentIcon />,
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
      icon: <GroupIcon />,
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
      icon: <NotificationsIcon />,
      link: "/status",
      access: [isUser].some((x) => x),
    },
    {
      name: "CIMS",
      icon: <AssignmentIndIcon />,
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
      icon: <AccountTreeIcon />,
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
      icon: <AssessmentIcon />,
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
      icon: <EmojiEventsIcon />,
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
    <Box sx={boxStyles} style={{ backgroundColor: "rgb(17,24,39)" }}>
      <Paper
        sx={paperStyles}
        elevation={0}
        style={{ backgroundColor: "rgb(17,24,39)" }}
      >
        <List
          sx={listStyles}
          component="nav"
          style={{ backgroundColor: "rgb(17,24,39)" }}
        >
          <Grid paddingY="20px" container justifyContent="center">
            <img style={customStyles.image} src={vbLogo} alt="vb-logo" />
            {/* <Avatar
              sx={{
                height: "90px",
                width: "90px",
                color: "#111827",
                backgroundColor: "#9ca3af",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            /> */}
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
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText
                      primary={menuItem.name}
                      style={{ color: "rgb(156,163,175)" }}
                    />
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
                      <ListItemIcon>{menuItem.icon}</ListItemIcon>
                      <ListItemText
                        primary={menuItem.name}
                        style={{ color: "rgb(156,163,175)" }}
                      />
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
                                  <GridViewIcon
                                    style={{ color: "rgb(156,163,175)" }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  style={{ color: "rgb(156,163,175)" }}
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
