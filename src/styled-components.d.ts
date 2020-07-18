import "styled-components";
import { theme } from "./components/Theme/Theme";

type MainTheme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MainTheme {}
}
