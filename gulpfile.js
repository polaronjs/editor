const { series, watch, parallel } = require("gulp");
const { spawn } = require("child_process");

const environment = process.env.NODE_ENV || "development";

const buildCKCore = (cb) => {
  spawn("npm", ["install"], {
    stdio: "inherit",
    cwd: "projects/editor-core",
  }).on("close", () => {
    spawn("npm", ["run", "build"], {
      stdio: "inherit",
      cwd: "projects/editor-core",
    }).on("close", () => {
      spawn("mkdir", ["../lib/assets/editor-dist"], {
        stdio: "inherit",
        cwd: "projects/editor-core",
      }).on("close", () => {
        spawn("cp", ["-r", "./build/*", "../lib/assets/editor-dist"], {
          stdio: "inherit",
          cwd: "projects/editor-core",
        }).on("close", () => {
          cb();
        });
      });
    });
  });
};

const buildLibrary = (cb) => {
  spawn("npm", ["install"], { stdio: "inherit", cwd: "projects/lib" }).on(
    "close",
    () => {
      spawn(
        "ng",
        [
          "build",
          "lib",
          ...[environment === "production" ? "--prod" : null].filter(
            (x) => !!x
          ),
        ],
        { stdio: "inherit" }
      ).on("close", () => {
        cb();
      });
    }
  );
};

const startApp = (cb) => {
  spawn("npm", ["install"], { stdio: "inherit" }).on("close", () => {
    spawn("ng", ["serve"], { stdio: "inherit" }).on("close", () => {
      cb();
    });
  });
};

exports.serve = series(
  buildCKCore,
  buildLibrary,
  parallel(
    () => watch("./projects/lib/src/**/*", buildLibrary),
    startApp,
  )
);
exports.build = series(buildCKCore, buildLibrary);
