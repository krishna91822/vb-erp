import React from "react";
import "../style/bodyStyle.css";
import Button from "@mui/material/Button";

function Body(props) {
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
            <p>Assignee's</p>
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
                    <i id="rocket" class="fas fa-rocket"></i>
                  </div>
                  <div className="actions-icon">
                    <i id="refresh" class="fas fa-sync-alt"></i>
                  </div>
                  <div className="actions-icon">
                    <i id="file" class="far fa-file"></i>
                  </div>
                  <div className="actions-icon">
                    <i id="edit" class="far fa-edit"></i>
                  </div>
                  <div className="actions-icon">
                    <i id="delete" class="fas fa-trash-alt"></i>
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
