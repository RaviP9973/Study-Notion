import React from "react";

const IconButton = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  icon,
  customClasses,
  type,
}) => {
  return (
    <button className={customClasses} disabled={disabled} onClick={onclick} type={type}>
      {children ? (
        <>
          <span className="w-full">{text}</span>
          {children}
          {/* {children} */}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconButton;
