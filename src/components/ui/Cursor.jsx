import React from "react";

function Cursor() {
  const size = 30;
  return (
    <div
      className="fixed top-0 left-0 bg-primary rounded-full"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

export default Cursor;
