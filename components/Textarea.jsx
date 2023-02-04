import classNames from "classnames";
import React, { forwardRef } from "react";

const Textarea = forwardRef((props, ref) => (
  <textarea
    {...{ ...props }}
    ref={ref}
    className={classNames(
      "px-4 py-2 rounded outline-none border focus:ring focus:ring-slate-400 duration-200",
      {
        "outline-1 outline-offset-0 outline-red-500 focus:ring-red-200":
          props.invalid,
      }
    )}
    rows={5}
  ></textarea>
));

Textarea.displayName = "Textarea";
export default Textarea;
