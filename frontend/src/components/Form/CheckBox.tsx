import React, { useReducer, useState, useEffect, JSX } from "react";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  checked: boolean;
  stateProp: "hover" | "default";
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = ({ checked: propChecked, stateProp }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });

  const [checked, setChecked] = useState(propChecked);

  useEffect(() => {
    setChecked(propChecked);
  }, [propChecked]);

  const handleClick = () => {
    setChecked((prev) => !prev);
    // If onCheckedChange is provided, call it with the new checked state
    // This allows parent components to control the state if needed
    // if (onCheckedChange) {
    //   onCheckedChange(!checked);
    // }
  };

  return (
    <div
      className={`w-4 flex items-center gap-[7.11px] p-[3.56px] h-4 rounded-[var(--collection-spacing-xs)] justify-center relative ${
        checked
          ? state.state === "hover"
            ? "bg-colors-primary-500"
            : "bg-colors-primary-1000"
          : "bg-colors-light-100 border border-solid border-colors-light-100"
      }`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {checked && (
        <CheckIcon
          className="!w-[9px] !h-[9px] text-white"
          style={{ fontSize: "9px" }}
        />
      )}
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}
