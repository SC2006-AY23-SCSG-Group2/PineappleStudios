module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    // extraFileExtensions: [".tsx"],
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // "react/prop-types": "off",
    // "react/react-in-jsx-scope": "off",
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
};
