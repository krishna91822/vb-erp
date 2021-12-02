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
import { deleteRewardData } from "../../store/rewards-actions";

const rocket = {
  color: "blue",
  fontSize: 20,
};

const refresh = {
  color: "green",
  fontSize: 20,
};

const file = {
  color: "yellowgreen",
  fontSize: 20,
};

const edit = {
  color: "orange",
  fontSize: 20,
};

const deleteStyle = {
  color: "red",
  fontSize: 20,
};

function Body(props) {
  const dispatch = useDispatch();

  // console.log(props.data);

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
          {/* <div className="heading-id">
            <p>ID</p>
          </div> */}
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
          {props.data.map((d) => {
            return (
              <div className="multiple-rows-container">
                {/* <div className="id">
                  <p>{d.employee_id}</p>
                </div> */}
                <div className="rewardname">
                  <p>{d.reward_name}</p>
                </div>
                <div className="reward">
                  <p>{d.reward_type}</p>
                </div>
                <div className="assignee">
                  <p>{d.reward_sender}</p>
                </div>
                <div className="reward-state">
                  <p>{d.status}</p>
                </div>
                <div className="actions">
                  <div className="actions-icon">
                    <FontAwesomeIcon style={rocket} icon={faRocket} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon style={refresh} icon={faSyncAlt} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon style={file} icon={faFile} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon style={edit} icon={faEdit} />
                  </div>
                  <div className="actions-icon">
                    <FontAwesomeIcon
                      style={deleteStyle}
                      onClick={() => dispatch(deleteRewardData(d._id))}
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
