const packager = require("electron-packager");
const package = require("./package.json");

packager({
  name: package["name"]
  , dir: "."
  , out: "./dist"
  , icon: "./public/favicon.ico"
  , platform: "all"
  , arch: "all"
  , electronVersion: "1.7.9"
  , overwrite: true
  , asar: true
  , "app-version": package["version"]
  , "app-copyright": "Copyright (C) 2017 "
    + package["author"] + "."
  , "version-string": {
    CompanyName: "HashiDesign.,Inc."
    , FileDescription: package["name"]
    , OriginalFilename: package["name"] + ".exe"
    , "ProductName": package["name"]
    , InternalName: package["name"]
  }
  , prune: true
  , ignore: "\.git|\.gitignore|npm-debug.log|node_modules/(electron-packager|electron-prebuilt|\.bin)|public/(\.map$)|src|utils|dist|tmp"
}, function (err, appPaths) {
  if(err) throw new Error(err);
  console.log("Done: ", appPaths);
});

