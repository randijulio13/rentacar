import classNames from "classnames";
import React, { forwardRef } from "react";

const InputFile = forwardRef((props, ref) => (
  <input
    {...{ ...props }}
    ref={ref}
    type="file"
    className={classNames(
      `file:mr-4 file:py-2 file:px-4
            border rounded focus:ring focus:ring-slate-400 duration-200 outline-none overflow-hidden
     file:border-0
    file:text-sm file:font-semibold
    file:bg-slate-50 file:text-slate-700
    hover:file:bg-slate-100 active:file:bg-slate-600 active:file:text-slate-50`,
      {
        "outline-1 outline-offset-0 outline-red-500 focus:ring-red-200":
          props.invalid,
      }
    )}
  />
));

InputFile.displayName = "InputFile";
export default InputFile;
