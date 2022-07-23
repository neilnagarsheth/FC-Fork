import React, {Fragment} from "react";


function NotFound({ loading }) {
  const renderView = (
    <div className="NotFound">
      <h1>Not Found</h1>
    </div>
  );
  if (loading) {
    return <p>Loading...</p>;
  } else {
    return <Fragment>{renderView}</Fragment>;
  }
}

export default NotFound;