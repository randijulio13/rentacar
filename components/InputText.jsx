import classNames from "classnames";
import React, { forwardRef } from "react";

const InputText = forwardRef((props, ref) => {
  return (
    <input
      {...{ ...props }}
      ref={ref}
      type="text"
      className={classNames(
        "px-4 py-2 rounded outline-none border focus:ring duration-200",
        {
          "outline-1 outline-offset-0 outline-red-500 focus:ring-red-200":
            props.invalid,
          "focus:ring-slate-400": !props.invalid,
        }
      )}
    />
  );
});
InputText.displayName = "InputText";
export default InputText;
