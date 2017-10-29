'use strict';
const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    openURL = require('open'),
    lazypipe = require('lazypipe'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    bowerFiles = require('main-bower-files');

var app = {
    src: 'src',
    lib: 'lib',
    dist: 'dist',
    temp: 'temp'
};

var paths = {
    scripts: [app.src + '/**/*.js'],
    index: app.src + '/index.html'
};

var dependencies = {
    external: [ // external/third-party dependencies
        'jquery',
        'bootstrap',
        'angular',
        'angular-ui-router',
        'angularjs-slider'
    ]
};

function getDependencyName(path) {
    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return path.substring(0, path.indexOf('/'));
}

/************
 * Reusable pipelines
 ************/
var lintScripts = lazypipe()
    .pipe($.jshint, '.jshintrc')
    .pipe($.jshint.reporter, 'jshint-stylish');

/************
 * Inject
 ************/
// inject third party components
gulp.task('inject:bower', function () {
    var bowerStream = gulp.src(bowerFiles(), {read: false});
    return gulp.src(paths.index)
        .pipe($.inject(bowerStream, {
            name: 'external',
            relative: true,
            ignorePath: '../' + app.lib + '/',
            transform: function (filePath) {
                return dependencies.external.indexOf(getDependencyName(filePath)) !== -1
                    ? $.inject.transform.apply($.inject.transform, arguments)
                    : null;
            }
        }))
        .pipe(gulp.dest(app.src));
});

// inject source files
gulp.task('inject:src', function () {
    return gulp.src(paths.index)
        .pipe($.inject(gulp.src(paths.scripts, {read: false}), {relative: true}))
        .pipe(gulp.dest(app.src));
});

gulp.task('inject', ['inject:bower', 'inject:src']);

/************
 * Build
 ************/
gulp.task('clean:dist', function (cb) {
    rimraf('./' + app.dist, cb);
});

gulp.task('clean:temp', function (cb) {
    rimraf('./' + app.temp, cb);
});

gulp.task('lint:scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(lintScripts());
});

// copy tasks
gulp.task('copy:bower', function () {
    return gulp.src('bower.json')
        .pipe(gulp.dest(app.dist));
});

gulp.task('copy:images', function () {
    return gulp.src(app.src + '/images/**/*')
        .pipe(gulp.dest(app.dist + '/images'));
});

gulp.task('copy:server', function () {
    return gulp.src(app.src + '/server/**/*')
        .pipe(gulp.dest(app.dist + '/server'));
});

gulp.task('copy:fonts', function () {
    return gulp.src(app.src + '/fonts/**/*')
        .pipe(gulp.dest(app.dist + '/fonts'));
});

gulp.task('copy:template', function () {
    return gulp.src([app.src + '/**/*.html', '!' + app.src + '/index.html'])
        .pipe(gulp.dest(app.dist))
});

gulp.task('copy', ['copy:bower', 'copy:images', 'copy:fonts', 'copy:template', 'copy:server']);

gulp.task('client:build', function () {
    var jsFilter = $.filter([app.src + '**/*.js'], {restore: true});

    return gulp.src(paths.index)
        .pipe($.useref({searchPath: [app.src, app.lib]}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(app.dist));
});

// build
gulp.task('build', ['clean:dist', 'clean:temp', 'inject'], function () {
    runSequence(['copy', 'client:build']);
});

/************
 * Watch
 ************/
gulp.task('watch', function () {
    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe(lintScripts())
        .pipe($.connect.reload());

    gulp.watch('bower.json', ['inject:bower']);
});

/************
 * Serve
 ************/
gulp.task('start:client', ['start:server'], function () {
    openURL('http://localhost:9000/#!/book-ticket');
});

gulp.task('start:server', function () {
    $.connect.server({
        root: [app.src, app.lib],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000
    });
});

gulp.task('serve', function (cb) {
    runSequence('clean:temp',
        ['lint:scripts'],
        ['start:client'],
        'watch', cb);
});

gulp.task('serve:prod', function () {
    $.connect.server({
        root: [app.dist],
        livereload: true,
        port: 9001
    });
});