import React from "react";
import "./rewardTableStyle.css";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import RewardRowData from "./RewardRowData";

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Body = (props) => {
  return (
    <div className="main-body">
      <div className="middle-container">
        <div className="middle-title">
          <p>R&R's Information</p>
        </div>
        <div className="middle-button">
          <Link className="remove-underline" to="/rewards/create">
            <Button color="success" variant="contained">
              Create a Reward
            </Button>
          </Link>
        </div>
      </div>
      <div className="table-container">
        <div className="heading-row-container">
          <div className="heading-rewardname">
            <p>Reward Name</p>
          </div>
          <div className="heading-reward">
            <p>Reward Type</p>
          </div>
          <div className="heading-assignee">
            <p>Issuer</p>
          </div>
          <div className="heading-reward-state">
            <p>Status</p>
          </div>
          <div className="heading-actions">
            <p>Actions</p>
          </div>
        </div>
        <div className="data-row-container">
          {props.rewardData.map((data) => {
            return <RewardRowData data={data} StyledMenu={StyledMenu} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
