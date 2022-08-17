module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-inline-import",
        {
          extensions: [".svg"],
        },
      ],
      ["module:react-native-dotenv"],
      ["react-native-reanimated/plugin"],
    ],
  };
};
