var gulp=require("gulp");
var browserSync=require("browser-sync").create();  //3001调试端口
//创建前端测试服务器
gulp.task("server",function(){
    browserSync.init({
        server: {
            baseDir:"www/"
        }
    });
});
//自动刷新浏览器
gulp.task("refresh",function(){
    browserSync.reload();
});
//拷贝所有需要用到的插件到www目录
var path = "./bower_components";
var file = {
    css: path + "/bootstrap/dist/css/*.css",
    fonts: path + "/bootstrap/dist/fonts/*.*",
    js: [
        path + "/angular/angular*.js",
        path + "/showdown/dist/*.js",
        path + "/marked/lib/*.js"
    ]
};
gulp.task("copy", function(){
    gulp.src(file.css).pipe(gulp.dest("./www/css/"));
    gulp.src(file.fonts).pipe(gulp.dest("./www/fonts/"));
    gulp.src(file.js).pipe(gulp.dest("./www/js/"));
});

//监视文件更改刷新浏览器
gulp.task("watch", function(){
    gulp.watch("./www/index.html", ["refresh"]);
});
//默认事物
gulp.task("default", ["copy", "server", "watch"]);