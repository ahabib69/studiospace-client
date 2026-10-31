import coreWebVitals from "eslint-config-next/core-web-vitals";
const config = [
  ...coreWebVitals,
  { ignores: [".next/**", "node_modules/**"] },
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
export default config;
