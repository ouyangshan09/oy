module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset",
    "@babel/preset-env",
    // "@vue/app"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
