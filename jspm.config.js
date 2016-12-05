SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "Skeletor/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.15"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "skeletor": {
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
