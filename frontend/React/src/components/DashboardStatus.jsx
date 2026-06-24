import React from "react";

const DashboardStatus = ({
  totalTodos,
  completedTodos,
  pendingTodos
}) => {
  return (
    <div className="row text-center mb-4">

      <div className="col-4">
        <div className="card bg-primary text-white">
          <div className="card-body py-2">
            <h6 className="mb-1">📋 Total</h6>
            <h5>{totalTodos}</h5>
          </div>
        </div>
      </div>

      <div className="col-4">
        <div className="card bg-success text-white">
          <div className="card-body py-2">
            <h6 className="mb-1">✅ Done</h6>
            <h5>{completedTodos}</h5>
          </div>
        </div>
      </div>

      <div className="col-4">
        <div className="card bg-warning text-dark">
          <div className="card-body py-2">
            <h6 className="mb-1">⏳ Pending</h6>
            <h5>{pendingTodos}</h5>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardStatus;