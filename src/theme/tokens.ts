export const colors = {
  secondary: "#F5F5F7",
  background: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#52525B",
  border: "#E5E5EA",
  upvote: "#FF5630",
  success: "#36B37E",

  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5EA",
    300: "#D1D1D6",
    400: "#A1A1AA",
    500: "#6E6E73",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
  },

  primary: {
    100: "#FFE5D6",
    200: "#FFC2A6",
    300: "#FF9E75",
    400: "#FF7A44",
    500: "#FF4D00",
    600: "#E64300",
    700: "#D63F00",
    800: "#C63900",
    900: "#B52F00",
  },
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
} as const;

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "16px",
} as const;

export const shadows = {
  card: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

export const typography = {
  fontFamily: `'Inter', sans-serif`,
  h1: "24px",
  h2: "20px",
  body: "16px",
  small: "14px",
  weightRegular: 400,
  weightMedium: 500,
  weightBold: 600,
} as const;
