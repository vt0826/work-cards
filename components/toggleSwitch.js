import React from "react";

const Switch = ({ isOn, handleToggle }) => (
  <>
    <label className="react-switch-label" htmlFor="react-switch-new">
      <span className="react-switch-button" />
    </label>
    <label className="switch">
      <input checked={isOn} onChange={handleToggle} type="checkbox" />
      <span className="slider round"></span>
    </label>

    <style jsx>{`
      .switch {
        position: relative;
        display: inline-block;
        width: 200px;
        height: 34px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 33px;
        width: 100px;

        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(100px);
        -ms-transform: translateX(100px);
        transform: translateX(100px);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
        border: 1px solid black;
      }

      .slider.round:before {
        border-radius: 34px;
        border: 1px solid black;
      }
    `}</style>
  </>
);

export default Switch;
