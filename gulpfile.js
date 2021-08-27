var gulp = require("gulp");
var FwdRef = require("undertaker-forward-reference");
gulp.registry(FwdRef());


var gulp_typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var rename = require("gulp-rename");

//var less = require("./tools/gulp-plugins/gulp-less");
var rollup = require("./tools/gulp-plugins/gulp-rollup");

var typescript = gulp_typescript.createProject("tsconfig.json", {
  module: "esnext",
  target: "esnext",
  importHelpers: true,
  removeComments: true,
  allowJs: true,
  jsx: "react",
  experimentalDecorators: true,
  noResolve: true,
  isolatedModules: true,
  skipLibCheck: true,
});

gulp.task("extract", function () {
  //let closure = require("@ampproject/rollup-plugin-closure-compiler");
  //let { terser } = require("rollup-plugin-terser");
  return gulp
    .src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
    .pipe(typescript())
    //.pipe(babel(BABEL_CONFIG))
    .pipe(
      rollup({
        input: "src/extract.js",
        output: {
          format: "esm",
        },
        //external: Object.keys(require("./package.json").dependencies),
        treeshake: {
          moduleSideEffects: false,
        },
        inlineDynamicImports: true,
        plugins: [
          //terser(),
          //closure()
        ],
        onwarn: function (message) {
          if (/external dependency/.test(message)) {
            return;
          }
          if (message.code === "CIRCULAR_DEPENDENCY") {
            return;
          }
          if (message.code === "INPUT_HOOK_IN_OUTPUT_PLUGIN") {
            return;
          } else console.error(message);
        },
      })
    )
    .pipe(gulp.dest("build"));
});



var flatten = require('gulp-flatten');

gulp.task("flatten", () => {
  return gulp.src('src/examples/**/*.{js,jsx,ts,tsx}')
  .pipe(flatten())
  .pipe(gulp.dest('build/flat'));
})


// gulp.task("roll:app", function () {
//   //let closure = require("@ampproject/rollup-plugin-closure-compiler");
//   //let { terser } = require("rollup-plugin-terser");
//   return gulp
//     .src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
//     .pipe(typescript())
//     //.pipe(babel(BABEL_CONFIG))
//     .pipe(
//       rollup({
//         input: "src/app/main.js",
//         output: {
//           format: "esm",
//         },
//         external: Object.keys(require("./package.json").dependencies),
//         treeshake: {
//           moduleSideEffects: false,
//         },
//         inlineDynamicImports: true,
//         plugins: [
//           //terser(),
//           //closure()
//         ],
//         onwarn: function (message) {
//           if (/external dependency/.test(message)) {
//             return;
//           }
//           if (message.code === "CIRCULAR_DEPENDENCY") {
//             return;
//           }
//           if (message.code === "INPUT_HOOK_IN_OUTPUT_PLUGIN") {
//             return;
//           } else console.error(message);
//         },
//       })
//     )
//     .pipe(gulp.dest("build"));
// });

