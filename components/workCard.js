import React, { useState, useEffect } from "react";
import moment from "moment";

function WorkCard(props) {
  if (!props.worker) return null;

  // format the proper dattime display
  let date = new Date(props.workOrder.deadline);
  let momentDate = moment
    .unix(props.workOrder.deadline)
    .format("MM/DD/YYYY, h:mm:ss a");

  return (
    <div>
      <h3 className="text-worker">{props.workOrder.name}</h3>
      <h5 className="text-worker">{props.workOrder.description}</h5>
      <div className="flex-container">
        <div className="felx-item">
          <img
            src={`${props.worker.image}`}
            alt="Avatar"
            className="flex-item avatar"
          ></img>
        </div>
        <div className="flex-item">
          <h3 className="text-worker">{props.worker.name}</h3>
          <h4 className="text-worker">{props.worker.companyName}</h4>
          <h4 className="text-worker">{props.worker.email}</h4>
        </div>
      </div>
      <div className="flex-container time">
        <h4 className="text-worker">{momentDate}</h4>
      </div>
      <style jsx>{`
        .text-worker {
          font-weight: 300;
        }
        .avatar {
          vertical-align: middle;
          width: 150x;
          height: 150px;
          border-radius: 50%;
          border: 1px solid black;
        }

        .flex-container {
          padding: 0;
          margin: 0;
          list-style: none;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-flow: row wrap;
          justify-content: center;
        }
        .flex-container.time {
          display: flex;
          justify-content: flex-end;
          margin-right: 8px;
        }
        .flex-item {
          flex: 0 0 50%;
        }
      `}</style>
    </div>
  );
}

export default WorkCard;
