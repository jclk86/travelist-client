import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/travelist_logo.png";
import TokenService from "../../Services/token-service";
import "./Utils.css";

export function Logo({ className, ...props }) {
  return (
    <img
      src={logo}
      alt="logo"
      className={["Logo", className].join(" ")}
      {...props}
    ></img>
  );
}

export function Form({ className, ...props }) {
  return <form className={["Form", className].join(" ")} {...props}></form>;
}

export function Section({ className, ...props }) {
  return <div className={["Section", className].join(" ")} {...props}></div>;
}

export function Input({ className, ...props }) {
  return <input className={["Input", className].join(" ")} {...props}></input>;
}

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}

export function Select({ className, ...props }) {
  return (
    <select
      name="tag"
      className={["Select", className].join(" ")}
      {...props}
    ></select>
  );
}

export function FormLabel({ className, ...props }) {
  return (
    <label className={["FormLabel", className].join(" ")} {...props}></label>
  );
}

export function Required({ className, ...props }) {
  return (
    <span className={["Required", className].join(" ")} {...props}>
      &#42;
    </span>
  );
}

export function Button({ className, ...props }) {
  return (
    <button className={["Button", className].join(" ")} {...props}></button>
  );
}

export function CreatePostButton({ className, ...props }) {
  return (
    <NavLink to={TokenService.getAuthToken() ? "/add_article" : "/login"}>
      <button
        className={["CreatePostButton", className].join(" ")}
        {...props}
        type="button"
      ></button>
    </NavLink>
  );
}

export function DateFormatter(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleString("en-US", options);
}
