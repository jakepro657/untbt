import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "PretendardBold": ["PretendardBold", "sans-serif"],
        "PretendardRegular": ["PretendardRegular", "sans-serif"],
        "PretendardMedium": ["PretendardMedium", "sans-serif"],
        "PretendardSemiBold": ["PretendardSemiBold", "sans-serif"],
        "IBMPlexSansKRBold": ["IBMPlexSansKRBold", "sans-serif"],
        "IBMPlexSansKRMedium": ["IBMPlexSansKRMedium", "sans-serif"],
        "IBMPlexSansKRSemiBold": ["IBMPlexSansKRSemiBold", "sans-serif"],
        "TTHakgyoansimUndongjangL": ["TTHakgyoansimUndongjangL", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
