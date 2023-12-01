
export const baseStyle = {
  alignItems: "center",
  padding: "3px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#c57e96",
  borderStyle: "dashed",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  minHeight: "26vh",
  gap: "0",
  "@media(maxWidth: 600px)": {
    height: "80vh", 
  },
};

export const focusedStyle = {
  borderColor: "#c2185b",
};

export const acceptStyle = {
  borderColor: "#3daf6c",
};

export const rejectStyle = {
  borderColor: "#ff1744",
};
