var gulp = require("gulp");
var FwdRef = require("undertaker-forward-reference");
gulp.registry(FwdRef());

var path = require("path");
var fs = require("fs");
var jetpack = require('fs-jetpack')
var del = require("del");

var browserify = require("browserify");
var watchify = require("watchify");
var envify = require('loose-envify/custom')
const hmr = require("./tools/devserver/hmr-plugin");
const aliasify = require("./tools/transforms/aliasify");
var { sucrasify } = require("./tools/transforms/sucrasify");
var discify = require("discify")
var tinyify = require('tinyify')

var babel = require("gulp-babel");
var clip = require('gulp-clip-empty-files')
var gulp_typescript = require("gulp-typescript");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var less = require("gulp-less");
var rename = require('gulp-rename')

var rollup = require("./tools/gulptasks/gulp-rollup");
var closure = require('@ampproject/rollup-plugin-closure-compiler')
const {terser} = require('rollup-plugin-terser')
var rollupStream = require('@rollup/stream');
var commonjs = require("@rollup/plugin-commonjs")
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var nodeResolve = require("@rollup/plugin-node-resolve")


var typescript = gulp_typescript.createProject("tsconfig.json", {
  module: "esnext",
  target: "esnext",
  importHelpers: true,
  removeComments: true,
  allowJs: true,
  jsx: "react",
  jsxFactory: "h",
  experimentalDecorators: true,
  noResolve: true,
  isolatedModules: true,
  skipLibCheck: true
});


var typescript_inlineHelpers = gulp_typescript.createProject("tsconfig.json", {
  module: "esnext",
  target: "esnext",
  importHelpers: false,
  removeComments: true,
  allowJs: true,
  jsx: "react",
  jsxFactory: "h",
  experimentalDecorators: true,
  noResolve: true,
  isolatedModules: true,
  skipLibCheck: true
});

const createAliasConfig = dir => ({
  "@demo": `./${dir}/@demo`
});

/** @type import("@babel/core").TransformOptions */
var BABEL_CONFIG = {
  plugins: [
    ["babel-plugin-transform-react-pug"],
    ["babel-plugin-polished"],
    ["babel-plugin-macros"],
    ["babel-plugin-add-import-extension"],
    [
      "babel-plugin-module-resolver",
      {
        root: ["src"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
        //alias: createAliasConfig("src")
      }
    ],
  ],
  comments: false
};

/** @type import("@babel/core").TransformOptions */
var BABEL_CONFIG_ES_BUNDLE = {
  plugins: [
    ["babel-plugin-transform-react-pug"],
    ["babel-plugin-polished"],
    ["babel-plugin-macros"],
    ["bare-import-rewrite", {
			"modulesDir": "/node_modules",
			"rootBaseDir": "src",
			"alwaysRootImport": [],
			"ignorePrefixes": ["//"],
			"failOnUnresolved": false,
			"resolveDirectories": ["node_modules"],
			"processAtProgramExit": false,
			"preserveSymlinks": true
		}],
    ["babel-plugin-add-import-extension"],
    [
      "babel-plugin-module-resolver",
      {
        root: ["src"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
        //alias: createAliasConfig("src")
      }
    ],
  ],
  comments: false
};

gulp.task("clean", () => del(["dist"]));

gulp.task("babel1", () => {
  return gulp
    .src(["src/**/*.{tsx,ts,jsx,js}", "!src/**/*.{spec,test}.*"])
    .pipe(typescript())
    .pipe(babel(BABEL_CONFIG_ES_BUNDLE))
    .pipe(gulp.dest("build"));
});


gulp.task("babel", () => {
  return gulp
    .src(["src/**/*.{tsx,ts,jsx,js}", "!src/**/*.{spec,test}.*"])
    .pipe(typescript())
    .pipe(babel(BABEL_CONFIG))
    .pipe(gulp.dest("build"));
});

gulp.task("html", () => {
    return gulp
      .src(["src/public/index.development.html"])
      .pipe(rename("index.html"))
      .pipe(gulp.dest("build/public"))
      .pipe(livereload());
});

gulp.task("html:production", () => {
    return gulp
      .src(["src/public/index.production.html"])
      .pipe(rename("index.html"))
      .pipe(gulp.dest("build/public"))
});


gulp.task("styles", async () => {
  gulp
    .src(["src/**/*.{css,less}", "!src/public/**/*"])
    .pipe(concat("styles.less"))
    .pipe(less())
    //.pipe(postcss())
    .pipe(gulp.dest("build/public"))
    .pipe(livereload());
});

const b = watchify(
  browserify({
    entries: ["build/app/main.js"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    cache: {},
    packageCache: {},
    debug: false,
    sourceMaps: false,
    fullPaths: true
    //dedupe: true
  })
);
b.plugin(discify, {outdir: "build/public/disc"})
b.plugin(hmr);
b.transform(sucrasify);
b.transform([
  envify({
    NODE_ENV: "development"
  }), {global: true}
])
b.transform([
  aliasify.configure({
    aliases: {
      //"react": "react/cjs/react.production.min.js",
      //"react-dom": "react-dom/cjs/react-dom.production.min.js"
      //"react-dom": "react-dom/cjs/react-dom.profiling.min.js",
      "react": "preact/compat",
      "react-dom": "preact/compat"
    },
    appliesTo: { includeExtensions: [".js", ".jsx", ".tsx", ".ts"] }
  }),
  { global: true }
]);

b.on("error", console.log);
b.on("syntax", console.log);
b.on("update", bundle);

async function bundle() {
  b.bundle()
    .on("error", console.error)
    .pipe(fs.createWriteStream("build/public/main.js"));
}

gulp.task("rollit", function () {
  return (
    gulp.src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
      .pipe(typescript())
      .pipe(babel(BABEL_CONFIG))
      .pipe(
        rollup({
          input: "src/app/main.js",
          output: {
            format: "esm"
          },
          //external: Object.keys(require("./package.json").dependencies),
          treeshake: {
            moduleSideEffects: false
          },
          inlineDynamicImports: true,
          plugins: [
            commonjs(),
            nodeResolve(),
            terser(),
            closure()
          ],
          onwarn: function(message) {
            if (/external dependency/.test(message)) {
              return
            }
            if (message.code === 'CIRCULAR_DEPENDENCY') {
              return
            }
            if (message.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') {
              return
            }
            else console.error(message)
          },
        })
      )
      .pipe(gulp.dest("build"))
  );
});


gulp.task("roll:app", function () {
  return (
    gulp.src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
      .pipe(typescript())
      .pipe(babel(BABEL_CONFIG))
      .pipe(
        rollup({
          input: "src/app/main.js",
          output: {
            format: "esm"
          },
          external: Object.keys(require("./package.json").dependencies),
          treeshake: {
            moduleSideEffects: false
          },
          inlineDynamicImports: true,
          plugins: [
            //terser(),
            //closure()
          ],
          onwarn: function(message) {
            if (/external dependency/.test(message)) {
              return
            }
            if (message.code === 'CIRCULAR_DEPENDENCY') {
              return
            }
            if (message.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') {
              return
            }
            else console.error(message)
          },
        })
      )
      .pipe(gulp.dest("build"))
  );
});


gulp.task("roll:cjs", function () {
  return (
    gulp.src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
      .pipe(typescript())
      .pipe(babel(BABEL_CONFIG))
      .pipe(
        rollup({
          input: "src/app/main.js",
          output: {
            format: "cjs"
          },
          external: Object.keys(require("./package.json").dependencies),
          treeshake: {
            moduleSideEffects: false
          },
          inlineDynamicImports: true,
          plugins: [
            //terser(),
            //closure()
          ],
          onwarn: function(message) {
            if (/external dependency/.test(message)) {
              return
            }
            if (message.code === 'CIRCULAR_DEPENDENCY') {
              return
            }
            if (message.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') {
              return
            }
            else console.error(message)
          },
        })
      )
      .pipe(rename("main.js"))
      .pipe(gulp.dest("build"))
  );
});


gulp.task("roll:pre-tinyify", function () {
  return (
    gulp.src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
      .pipe(typescript())
      .pipe(babel(BABEL_CONFIG))
      .pipe(
        rollup({
          input: "src/app/main.js",
          output: {
            format: "cjs",
            dir: "build"
          },
          external: Object.keys(require("./package.json").dependencies),
          treeshake: {
            moduleSideEffects: false
          },
          inlineDynamicImports: true,
          plugins: [
            terser(),
            closure()
          ]
        })
      )
      .pipe(rename("main.js"))
      .pipe(gulp.dest("build/app"))
  );
});



gulp.task("roll:esbundle", function () {
  return (
    gulp.src(["./src/**/*{.js,.jsx,.ts,.tsx}"])
      .pipe(typescript())
      .pipe(babel(Object.assign({}, BABEL_CONFIG, 

      )))
      .pipe(
        rollup({
          input: "src/app/main.js",
          output: {
            format: "esm"
          },
          //external: Object.keys(require("./package.json").dependencies),
          treeshake: {
            moduleSideEffects: false
          },
          inlineDynamicImports: true,
          plugins: [
            commonjs(),
            nodeResolve(),
            terser(),
            closure()
          ]
        })
      )
      .pipe(rename("main.js"))
      .pipe(gulp.dest("build/public"))
  );
});

const serve = () => {
  const { polka, sirv } = require("./tools/devserver");
  const { PORT = 3002 } = process.env;
  const PUBLIC_INDEX_HTML = fs.readFileSync(
    path.resolve(__dirname, "build/public", "index.html")
  );

  const allowAMP = res =>
    res.setHeader(
      "AMP-Access-Control-Allow-Source-Origin",
      `http://localhost:${PORT}`
    );

  polka()
    .use(
      sirv(path.resolve(__dirname, "build/public"), {
        dev: true,
        setHeaders: res => allowAMP(res)
      })
    )
    .get("*", (req, res) => {
      res.end(PUBLIC_INDEX_HTML);
    })
    .listen(PORT, () => {
      console.log(`> Running on http://localhost:${PORT}`);
      console.log(`> BundleAnalyzer on http://localhost:${PORT}/disc/map`);
    });
};


gulp.task("watch", async () => {
  livereload.listen();
  gulp.watch("src/**/*.{css,less}", gulp.series("styles"));
  gulp.watch("src/**/*.html", gulp.series("html"));
  gulp.watch("src/**/*.{ts,tsx,js,jsx}", gulp.series("roll:app"));
});

gulp.task(
  "start",
  gulp.series(
    "clean",
    gulp.parallel("roll:app", "styles", "html"),
    gulp.parallel(bundle, "watch", serve)
  )
);


function logFileSize(filePath) {
    var size = fs.statSync(filePath).size;
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return Promise.resolve(console.log("SIZE:", 
      (size / Number(Math.pow(1024, i))).toFixed(2) +
      " " +
      ["B", "KB", "MB", "GB", "TB"][i]
    )).catch(e => console.log(e))
}

const runTinyify = () => {
  const b = browserify({
      entries: ["build/app/main.js"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      cache: {},
      packageCache: {},
      debug: false,
      sourceMaps: false,
      fullPaths: false,
      dedupe: true
  })
  .plugin(discify, {outdir: "build/public/disc_tinyify"})
  .plugin(tinyify)
  .transform([
    envify({
      NODE_ENV: "production"
    }), {global: true}
  ])
  .transform([
    aliasify.configure({
      aliases: {
        //"react": "react/cjs/react.production.min.js",
        //"react-dom": "react-dom/cjs/react-dom.production.min.js"
        //"react-dom": "react-dom/cjs/react-dom.profiling.min.js",
        "react": "preact/compat",
        "react-dom": "preact/compat"
      },
      appliesTo: { includeExtensions: [".js", ".jsx", ".tsx", ".ts"] }
    }),
    { global: true }
  ])
  .bundle()
  .on("error", console.error)
  .pipe(fs.createWriteStream("build/public/main.js"))
  .on("close", () => logFileSize("build/public/main.js"))
  
  b.on("error", console.log);
  b.on("syntax", console.log);
}


gulp.task("bundle:tinyify",
  gulp.series(
    "clean",
    gulp.parallel("roll:pre-tinyify", "styles", "html:production"),
    gulp.parallel([runTinyify, serve])
  )
);


gulp.task("bundle:rollup",
  gulp.series(
    "clean",
    gulp.parallel("roll:esbundle", "styles", "html:production"),
    //gulp.parallel([runTinyify, serve])
  ),
);



let ROLLUP_CACHE;

gulp.task('rollup:post-run', () => {
  return rollupStream({
      cache: ROLLUP_CACHE,
      input: 'build/app/main.js',
      output: {
          format: "esm"
        },
        //external: Object.keys(require("./package.json").dependencies),
        treeshake: {
          moduleSideEffects: false
        },
        inlineDynamicImports: true,
        plugins: [
          
          commonjs({
            namedExports: {
            //'node_modules/react/index.js': Object.keys(require("react")),
            //'node_modules/react-dom/index.js': Object.keys(require("react-dom"))
            'node_modules/react-is/index.js': Object.keys(require("react-is")),
          }
          }),
          nodeResolve()
          //terser(),
          //closure()
        ],
        onwarn: function(message) {
          if (/external dependency/.test(message)) {
            return
          }
          if (message.code === 'CIRCULAR_DEPENDENCY') {
            return
          }
          if (message.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') {
            return
          }
          else console.error(message)
        }
    })
    .on('bundle', (bundle) => {
      cache = bundle;
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build/public'));
});

gulp.task('watch', (done) => {
  gulp.watch('./src/**/*.js', gulp.series('rollup'));

  // or, with Gulp v3
  // gulp.watch('./src/**/*.js', ['rollup']);

  done();
});



// .pipe(source('main.js'))
// .pipe(buffer())
// .pipe(sourcemaps.init({ loadMaps: true }))
// .pipe(minify())
// .pipe(sourcemaps.write('./'))
// .pipe(gulp.dest('build/js'))

//externalizes stuff so you can use unpkg
//   .transform('browserify-shim', {
//   "lodash": "_",
//   "react": "React",
//   "react-dom": "ReactDOM"
// }, {global: true});

//you can skip writing files and just use 'browserify-middleware' package if you want to do this
//.get('/main.js', browserifyMiddleware(__dirname+'/src/app.tsx'))


//windows users can use this
//const {watchify} = require("./tools/transforms/watchify");

// this is poor mans tsconfig paths / babel root import resolver, its a browserify transform
//var {tspathify} = require('./tools/transforms/tspathify')


//undertaker is ass, this makes it a little less so
//var FwdRef = require("undertaker-forward-reference");

/**
 * this files tsconfig at the top doesnt check types, although a good strategy 
 * is to change the config to do type checks and to not emit on errors
 * by setting noEmitOnError: true. The compiled javascript files won't hit the 
 * build dir so no pressure on the watcher and it won't run hmr until the code compiles
*/

// wtb pt 96 font
// VIVA LA BROWSERIFY 