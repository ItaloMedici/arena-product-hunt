// design/theme.ts
import { colors, radii, shadows, spacing, typography } from "./tokens";

export const theme = {
  colors,
  spacing,
  radii,
  shadows,
  typography,
};

export type Theme = typeof theme;
