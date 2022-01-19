import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GridViewIcon from "@mui/icons-material/GridView";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
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

const SidebarNavigation = () => {
  const [openTasks, setOpenTasks] = useState(false);
  const [openPMO, setOpenPMO] = useState(false);
  const [openCMS, setOpenCMS] = useState(false);
  const [openRR, setOpenRR] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();
  const [selectedListIndex, setSelectedListIndex] = useState();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  const boxStyles = {
    position: "fixed",
    // top: "70px",
    // left: "0",
    height: "100vh",
    backgroundColor: "white",
    width: lgUp ? "250px" : "50px",
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
    width: lgUp ? "250px" : "50px",
    height: "100%",
    maxWidth: "250px",
    bgcolor: "white",
    color: "black",
  };
  const paperStyles = {
    padding: 0,
    margin: 0,
    width: lgUp ? "250px" : "50px",
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
      padding: lgUp ? "0px" : "10px 0px",
    },
    ".MuiSvgIcon-root ": {
      color: "rgb(156,163,175)",
    },

    ".MuiListItemIcon-root": {
      minWidth: lgUp ? "56px" : "0px",
    },

    "&.Mui-selected": {
      backgroundColor: "rgb(36,42,56)",
      borderRadius: lgUp ? ".4rem" : "none",
      marginLeft: lgUp ? ".5rem" : "0rem",
      marginRight: lgUp ? ".5rem" : "0rem",
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

  const NestedListItemButton = styled(ListItemButton)(({ theme }) => ({
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
      backgroundColor: "rgb(17,24,39)",
      borderRadius: lgUp ? ".4rem" : "none",
      marginLeft: lgUp ? ".5rem" : "0rem",
      marginRight: lgUp ? ".5rem" : "0rem",
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

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 1) {
      setOpenPMO(false);
      setOpenCMS(false);
      setOpenRR(false);
    } else if (index === 4) {
      setOpenTasks(false);
      setOpenCMS(false);
      setOpenRR(false);
    } else if (index === 5) {
      setOpenTasks(false);
      setOpenPMO(false);
      setOpenRR(false);
    } else if (index === 6) {
      setOpenTasks(false);
      setOpenCMS(false);
      setOpenPMO(false);
    } else {
      setOpenTasks(false);
      setOpenCMS(false);
      setOpenPMO(false);
      setOpenRR(false);
    }
    setSelectedListIndex(-1);
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

  const checkNestedlist = (index) => {
    setSelectedListIndex(index);
  };

  const trackPathName = () => {
    if (location.pathname === "my-profile") {
      setSelectedIndex(0);
    }

    if (location.pathname === "/create-profile") {
      setSelectedIndex(1);
      setSelectedListIndex(0);
      setOpenTasks(true);
    }

    if (location.pathname === "/reviews") {
      setSelectedIndex(1);
      setSelectedListIndex(1);
      setOpenTasks(true);
    }

    if (location.pathname === "/network") {
      setSelectedIndex(2);
    }

    if (location.pathname === "/cims") {
      setSelectedIndex(3);
    }

    if (location.pathname === "/pmo/projects") {
      setSelectedIndex(4);
      setSelectedListIndex(0);
      setOpenPMO(true);
    }

    if (location.pathname === "/pmo/projects/create") {
      setSelectedIndex(4);
      setSelectedListIndex(1);
      setOpenPMO(true);
    }

    if (location.pathname === "/pmo/allocations") {
      setSelectedIndex(4);
      setSelectedListIndex(2);
      setOpenPMO(true);
    }

    if (location.pathname === "/posow") {
      setSelectedIndex(5);
      setSelectedListIndex(0);
      setOpenCMS(true);
    }

    if (location.pathname === "/invoices") {
      setSelectedIndex(5);
      setSelectedListIndex(1);
      setOpenCMS(true);
    }

    if (location.pathname === "/rewards") {
      setSelectedIndex(6);
      setSelectedListIndex(0);
      setOpenRR(true);
    }
  };

  useEffect(() => {
    trackPathName();
  }, []);

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
    {
      name: "Status",
      icon: <NotificationsIcon />,
      link: "/status",
      access: [isUser].some((x) => x),
    },
  ];
  if (lgUp) {
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
                            (item, i) =>
                              item.access && (
                                <NestedListItemButton
                                  component={Link}
                                  to={item.link}
                                  sx={{ pl: 4 }}
                                  selected={selectedListIndex === i}
                                  onClick={() => checkNestedlist(i)}
                                >
                                  <ListItemIcon>
                                    <GridViewIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={item.name}
                                    style={{ color: "rgb(156,163,175)" }}
                                  />
                                </NestedListItemButton>
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
  }
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
                      {menuItem.open ? <ExpandLess /> : <ExpandMore />}
                    </CustomListItemButton>
                    <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {menuItem.dropDown.map(
                          (item, i) =>
                            item.access && (
                              <NestedListItemButton
                                component={Link}
                                to={item.link}
                                sx={{ pl: 2 }}
                                selected={selectedListIndex === i}
                                onClick={() => checkNestedlist(i)}
                              >
                                <ListItemIcon>
                                  <GridViewIcon />
                                </ListItemIcon>
                              </NestedListItemButton>
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
