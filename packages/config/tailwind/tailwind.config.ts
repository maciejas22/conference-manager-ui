import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      width: {
        sidebar: "18rem",
        navbar: "calc(100% - 18rem)",
      },
    },
  },
  darkMode: "class",
};
export default config;
