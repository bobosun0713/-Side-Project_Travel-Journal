var gulp = require("gulp"),
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    imagemin = require("gulp-imagemin"),
    jshint = require("gulp-jshint"),
    fileinclude = require("gulp-file-include"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create(),
    autoprefixer = require("autoprefixer"),
    postcss = require("gulp-postcss"),
    reload = browserSync.reload;

// path 路徑
var web = {
    html: ["dev/*.html", "dev/**/*.html"],
    sass: ["dev/sass/*.scss", "dev/sass/**/*.scss"],
    css: ["dev/css/*.css", "dev/css/**/*.css"],
    js: ["dev/js/*.js"],
    img: ["dev/img/*.*", "dev/img/**/*.*", "dev/img/**/**/*.*"],
};

// 任務流程
gulp.task("concatjs", function () {
    gulp.src(web.js).pipe(gulp.dest("dest/js"));
});

gulp.task("img", function () {
    gulp.src(web.img).pipe(gulp.dest("dest/img"));
});

gulp.task("image-min", function () {
    gulp.src(web.img).pipe(imagemin()).pipe(gulp.dest("dest/img"));
});

gulp.task("all", function () {
    gulp.src(web.js).pipe(gulp.dest("dest/js"));
    gulp.src(web.css).pipe(gulp.dest("dest/css"));
    gulp.src(web.img).pipe(imagemin()).pipe(gulp.dest("dest/img"));
});

gulp.task("sass", function () {
    var processors = [
        // 定義 postCSS 所需要的元件
        autoprefixer({ browsers: ["last 5 version"] }), // 使用 autoprefixer，這邊定義最新的五個版本瀏覽器
    ];
    return (
        gulp
            .src("dev/sass/*.scss")
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", sass.logError))
            .pipe(cleanCSS({ compatibility: "ie9", keepSpecialComments: "*" }))
            // .pipe(sourcemaps.write())
            .pipe(postcss(processors))
            .pipe(gulp.dest("dest/css/"))
    );
});

gulp.task("fileinclude", function () {
    gulp.src(["dev/*.html"])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulp.dest("./dest"));
});

// 監看項目
gulp.task("default", function () {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index: "index.html",
        },
    });
    gulp.watch(web.html, ["fileinclude"]).on("change", reload);
    gulp.watch(web.sass, ["sass"]).on("change", reload);
    gulp.watch(web.js, ["concatjs"]).on("change", reload);
    // gulp.watch(web.js, ['lint']).on('change', reload);
    gulp.watch(web.img, ["img"]).on("change", reload);
});
