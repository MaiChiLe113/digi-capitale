import React, { JSX } from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  showIcon: boolean;
  label: string;
  type: "primary" | "secondary" | "tertiary";
  stateProp: "hover" | "default";
  size: "small" | "big";
  typeSecondaryStateClassName: any;
  divClassName: any;
  to: string;
  to1: string;
}

export const Button = ({
  showIcon = true,
  label = "Button",
  type,
  stateProp,
  size,
  typeSecondaryStateClassName,
  divClassName,
  to,
  to1,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "secondary",

    state: stateProp || "default",

    size: size || "big",
  });

  return (
    <Link to={to || to1 || "#"}>
      <button
        className={`all-[unset] box-border inline-flex items-center relative gap-[var(--collection-spacing-sm)] justify-center ${state.state === "default" && state.type === "secondary" ? "border-colors-light-100" : (state.type === "secondary" && state.state === "hover") ? "border-colors-light-250" : ""} ${state.size === "big" ? "pr-[var(--collection-spacing-xxl)] pl-[var(--collection-spacing-xxl)] py-2.5" : ""} ${state.size === "small" ? "rounded-lg" : "rounded-[var(--collection-corner-radius-sm)]"} ${state.type === "secondary" ? "bg-colors-light-100" : (state.state === "default" && state.type === "primary") ? "bg-colors-primary-1000" : state.type === "primary" && state.state === "hover" ? "bg-colors-primary-500" : ""} ${state.type === "secondary" ? "border border-solid" : ""} ${state.size === "big" ? "min-w-[140px]" : ""} ${state.size === "big" ? "h-11" : ""} ${typeSecondaryStateClassName}`}
        onMouseEnter={() => {
          dispatch("mouse_enter");
        }}
        onMouseLeave={() => {
          dispatch("mouse_leave");
        }}
      >
        {showIcon && (
          <ArrowForwardIcon
            className="!w-[18px] !h-[18px]"
            style={{ fontSize: "18px" }}
          />
        )}

        <span
          className={`[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] font-normal leading-5 whitespace-nowrap relative block ${state.size === "small" ? "mt-[-1.00px]" : ""} ${state.size === "small" ? "text-sm" : "text-base"} ${state.type === "secondary" ? "text-colors-light-1000" : (state.type === "primary") ? "text-colors-dark-1000" : state.state === "default" && state.size === "small" ? "text-colors-primary-1000" : state.size === "small" && state.state === "hover" ? "text-colors-primary-500" : ""} ${divClassName}`}
        >
          {label}
        </span>
      </button>
    </Link>
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
