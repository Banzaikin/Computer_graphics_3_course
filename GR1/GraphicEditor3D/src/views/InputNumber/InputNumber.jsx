import React from "react";
import classes from "./InputNumber.module.css";

const InputNumber = ({
                         value,
                         valueChange,
                         step,
                         maxRange = 40,
                         disabled = false,
                         text = "123",
                     }) => {
    return (
        <div className={classes.body}>
            <div className={classes.text}>{text}</div>
            <div className={classes.inputContainer}>
                <input
                    type="number"
                    step={step}
                    value={value}
                    onChange={(e) => valueChange(Number(e.target.value))}
                    disabled={disabled}
                    className={classes.number}
                />
                <input
                    type="range"
                    step={step}
                    min={-step * maxRange}
                    max={step * maxRange}
                    value={value}
                    onChange={(e) => valueChange(Number(e.target.value))}
                    disabled={disabled}
                    className={classes.range}
                />
            </div>
        </div>
    );
};

export default InputNumber;