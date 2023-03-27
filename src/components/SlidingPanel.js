import React from "react";

const SlidingPanel = ({ children, isPanelSlide }) => {
  return (
    <>
      <div className={`cover-box ${isPanelSlide && "cover-over"}`}></div>
      <div className={`panel-wrap ${isPanelSlide && "slide-in"}`}>
        <div className="panel">{children}</div>
      </div>
    </>
  );
};

export default SlidingPanel;
