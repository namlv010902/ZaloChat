const colors = {
  primary: "#60a5fa", 
  error: "#EF5350",   
  success: "#4CAF50", 
   blue: {
    100: "#dbeafe", 
    200: "#bfdbfe",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a"
  },  
  red: {
    100: "#FFEBEE",
    200: "#FFCDD2",
    300: "#EF9A9A",
    400: "#E57373",
    500: "#EF5350",
    600: "#F44336",
    700: "#E53935",
    800: "#D32F2F",
    900: "#C62828",
  },
};

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const fontFamily = {
  sans: ["Inter", "sans-serif"],
  heading: ["Poppins", "sans-serif"],
};

const theme = {
  colors,
  screens,
  fontFamily,
};

export {theme}
