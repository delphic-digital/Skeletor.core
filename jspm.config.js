SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "skeletor.core/": "src/"
  },
  browserConfig: {
    "baseURL": "/",
    "bundles": {
      "dist/skeletor.core.js": [
        "skeletor.core/skeletor.core.js",
        "npm:jquery@3.1.1/dist/jquery.js",
        "npm:jquery@3.1.1.json",
        "npm:systemjs-plugin-babel@0.0.15/babel-helpers/createClass.js",
        "npm:systemjs-plugin-babel@0.0.15.json",
        "npm:systemjs-plugin-babel@0.0.15/babel-helpers/classCallCheck.js"
      ]
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.15"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "skeletor.core": {
      "main": "skeletor.core.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "jquery": "npm:jquery@3.1.1"
  },
  packages: {}
});
