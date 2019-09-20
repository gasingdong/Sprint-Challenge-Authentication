module.exports = {
  "parser":  "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
	  "plugin:prettier/recommended",
  ],
  "parserOptions": {
	  "ecmaVersion": 6,
	  "sourceType": "module",
	  "ecmaFeatures": {
      "jsx": true
    },
    "extraFileExtensions": [".vue"],
  },
  "env": { 
    "es6": true,
  },
  "globals": {
    "console": "readonly",
	  "document": "readonly",
	  "window": "readonly",
    "it": "readonly",
    "localStorage": "readonly",
  },
  "settings": {
	"react": {
	  "version": 'detect',
	  }
  }
};