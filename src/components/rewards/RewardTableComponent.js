import React from "react";
import "./rewardTableStyle.css";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faFile,
  faSyncAlt,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteRewardData } from "../../store/rewards-slice";

function Body(props) {
  const dispatch = useDispatch();
  return (
    <div className="main-body">
      <div className="middle-container">
        <div className="middle-title">
          <p>R&R's Information</p>
        </div>
        <div className="middle-button">
          <Button color="success" variant="contained">
            Create a Reward
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="heading-row-container">
          <div className="heading-id">
            <p>ID</p>
          </div>
          <div className="heading-reward">
            <p>Reward Type</p>
          </div>
          <div className="heading-assignee">
            <p>Sponsors</p>
          </div>
          <div className="heading-reward-state">
            <p>Reward Date</p>
          </div>
          <div className="heading-actions">
            <p>Actions</p>
          </div>
        </div>
        <div className="data-row-container">
          <p id="error-message"> {props.errorMessage} </p>
          {props.data.map((d) => {
            return (
              <div className="multiple-rows-container">
                <div className="id">
                  <p>{d.id}</p>
                </div>
                <div className="reward">
                  <p>{d.rewardType}</p>
                </div>
                <div className="assignee">
                  <p>{d.assignee}</p>
                </div>
                <div className="reward-state">
                  <p>{d.rewardDate}</p>
                </div>
                <div className="actions">
                  <div className="actions-icon">
                    <FontAwesomeIcon icon={faRocket} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon icon={faSyncAlt} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon icon={faFile} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon
                      onClick={() => dispatch(deleteRewardData(d.id))}
                      icon={faTrashAlt}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
