import React from "react";
const inputStyles={
    "width": "70%",
"border-radius": "5px",
"border":"2px solid #a7adb2",
"padding": "12px",
"margin-top": "10px",
"margin-bottom": "10px",
}
function Input({type, name, placeholder}){
    return(
        <div  className="form-group">
        <input className="form-control" style={inputStyles} type={type} name={name} placeholder={placeholder} />
      </div>
    );
};
export default Input;