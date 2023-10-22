import React from "react";
import Input from "./Input";
const boxStyles = {
    "background-color": "#f5f6f5",
    "box-shadow": "10px 5px 5px #e6e6e6",
    "border-radius": "5px",
    "text-align": "center",
    "width": "300px",
    "height": "400px",
    "position": "absolute",
    "top": "0",
    "bottom": "0",
    "left": "0",
    "right": "0",
    "margin": "auto",
};

const headingStyle = {
    "text-align": "left",
    "margin-top": "40px",
    "margin-left": "25px",
};

const buttonStyle = {
    "margin-top": "50px",
    "width": "80%",
    "background-color": "black",
    "color": "white",
    "padding": "10px",
    "border-radius": "5px",
    "border": "none",
    "font-weight": "bolder",
};
const linkStyles = {
    "display": "block",
    "text-decoration": "none",
    "color": "#000",
    "font-size": "14px",
    "margin-top": "10px",
    "margin-bottom": "10px",
    "margin-left": "20px",
    "position": "absolute",
    "bottom": "0",
    "left": "0"
  };
  
function createInput(input){
    return(
    <Input
    key={input.id}
    type={input.type}
    name={input.name}
    placeholder={input.placeholder}
    />
    );
};



function BoxForm(props){
    return(
    <form style={boxStyles} onSubmit={props.submit} action={props.action} method="POST">
    <h1 style={headingStyle}>{props.heading}</h1>
       {props.inputArray.map(createInput)}
        <button type="submit" style={buttonStyle}>{props.buttonLabel}</button>
        {props.link && (
        <a href={props.link.url} style={linkStyles}>
          {props.link.label}
        </a>
      )}
      </form>

    );
};
export default BoxForm;