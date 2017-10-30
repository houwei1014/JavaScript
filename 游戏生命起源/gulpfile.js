var gulp=require("gulp");
var browserSync=require("browser-sync").create();
var plumber=require("gulp-plumber");
var cleanCss=require("gulp-clean-css");
var ugLify=require("gulp-uglify");
var rename=require("gulp-rename");
var sass=require("gulp-sass");
//服务器
gulp.task("server",function(){
    browserSync.init({
        server:{
            baseDir:"www/"
        }
    });
});
//浏览器刷新
gulp.task("refresh",function(){
    browserSync.reload();
});
//复制插件文件 bootstrap angular
//var path = "./bower_components";
gulp.task("copy",function(){
    gulp.src(["./bower_components/angular/angular*.js"]).pipe(gulp.dest("./www/js/"));
    gulp.src(["./bower_components/angular-md5/angular-md5*.js"]).pipe(gulp.dest("./www/js/"));
    gulp.src(["./bower_components/bootstrap/dist/**/*.*","!./bower_components/bootstrap/dist/css/*.map","!./bower_components/bootstrap/dist/js/*.*"]).pipe(gulp.dest("./www/"));
});
//html ,css, js,sass事务
gulp.task("html", function(){
        gulp.src("./src/**/*.html").pipe(gulp.dest("./www/"));
    });
gulp.task("css", function(){
    gulp.src("./src/**/*.css").pipe(gulp.dest("./www/"));
});
gulp.task("minify-css", function(){
    gulp.src("./src/**/*.css").pipe(plumber()).pipe(cleanCss({ compatibility: "ie8"})).pipe(rename({ suffix: ".min"})).pipe(gulp.dest("./www/"));
});
gulp.task("js", function(){
    gulp.src("./src/**/*.js").pipe(gulp.dest("./www/"));
});
gulp.task("minify-js", function(){
    gulp.src("./src/**/*.js").pipe(plumber()).pipe(ugLify()).pipe(rename({ suffix: ".min"})).pipe(gulp.dest("./www/"));
});
gulp.task("sass", function(){
    gulp.src("./src/sass/**/*.scss").pipe(plumber()).pipe(sass({outputStyle: "compact"}).on("error", sass.logError)).pipe(gulp.dest("./www/css/"));
});
//监视器
gulp.task("watch", function(){
    gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./src/**/*.css", ["css", "minify-css"]);
    gulp.watch("./src/**/*.js", ["js", "minify-js"]);
    gulp.watch("./src/sass/**/*.scss", ["sass"]);
    gulp.watch("./www/**/*.*", ["refresh"]);
});
//默认事物：copy ，html，sass,css，minify-css，js，minify-js，server，watch
gulp.task("default", ["copy", "html", "sass", "css", "minify-css", "js", "minify-js", "server", "watch"]);