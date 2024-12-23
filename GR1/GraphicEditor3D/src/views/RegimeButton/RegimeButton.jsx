import React from "react";

const RegimeButton = ({ icon, size, disabled, onClick, title }) => {
    const padding = 3;
    return (
        <div
            title={title}
            style={{
                background: disabled ? "#b6b7ba" : "rgba(0, 0, 0, 0)",
                cursor: "pointer",
                padding: `${padding}px`,
                borderRadius: "3px",
                color: disabled ? "#888" : "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
                width: `${size}px`,
                height: `${size}px`,
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            onClick={onClick}
        >
            {icon}
        </div>
    );
};

export default RegimeButton;