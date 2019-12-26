'use strict';

function pugErrorHandler(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require("opn"),
    sass = require("gulp-sass"),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    pug = require('gulp-pug'),
    minifyCss = require('gulp-minify-css'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    replace = require('gulp-replace-path'),
    autoprefixer = require('gulp-autoprefixer'),
    gulpPugBeautify = require('gulp-pug-beautify');


gulp.task('image', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/img'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./img/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 10
    }));
    spriteData.img.pipe(gulp.dest('./img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./scss/misc/')); // путь, куда сохраняем стили
});


gulp.task('replace', ['replace-html', 'replace-css', 'replace-js']);

gulp.task('replace-html', function(){
    gulp.src('public/**/*.html')
        .pipe(replace('src="../','src="./'))
        .pipe(gulp.dest('public'));
});

gulp.task('replace-linksrc', function(){
    gulp.src('public/**/*.html')
        .pipe(replace('href="../','href="./'))
        .pipe(gulp.dest('public'));
});

gulp.task('replace-imgsrc', function(){
    gulp.src('public/**/*.html')
        .pipe(replace("url('../", "url('./"))
        .pipe(gulp.dest('public'));
});

gulp.task('replace-imgsrcother', function(){
    gulp.src('public/**/*.html')
        .pipe(replace("url(../","url(./"))
        .pipe(gulp.dest('public'));
});

gulp.task('replace-css', function(){
    gulp.src('public/css/main.css')
        .pipe(replace('url("/','url("'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('replace-js', function(){
    gulp.src('public/js/main.js')
        .pipe(replace('imageSrc:"../','imageSrc:"'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('clean', function () {
    return gulp.src('public', {read: false})
        .pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true,
        port: 8888
    });
    opn('http://localhost:8888/html');
});

gulp.task('html', function () {
    gulp.src('./html/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./css/*.css')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('minifyJS', function() {
    gulp.src('./js/*.js')
        .pipe(gulpif('app.js', uglify()))
        .pipe(gulp.dest('./js'));
});

gulp.task('minifyCSS', function() {
    gulp.src('./css/app.css')
        .pipe(gulpif('app.css', uglify()))
        .pipe(gulp.dest('./css'));
});

gulp.task('pug', function buildHTML() {
    return gulp.src(['./pug/**/*.pug','!./pug/**/_*.pug'])
        .pipe(pug({
            pretty: true
        }).on('error', pugErrorHandler))
        .pipe(gulpPugBeautify({
            omit_empty: true,
            fill_tab: true,
            tab_size: 4
        }))
        .pipe(gulp.dest('./html'));
});

gulp.task('watch', function () {
    gulp.watch(['./pug/**/*.pug','./pug/**/_*.pug'], ['pug']);
    gulp.watch(['./**/*.html'], ['html']);
    gulp.watch(['./scss/**/*.scss', './scss/**/_*.scss'], ['sass']);
    gulp.watch(['./css/**/*.css'], ['css']);
    gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);
