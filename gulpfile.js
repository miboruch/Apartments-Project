const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

gulp.task('update', function() {
  return gulp.src('src/*').pipe(gulp.dest('public/'));
});

gulp.task('updateJS', function() {
  return gulp.src('src/Client/js/*.js').pipe(gulp.dest('public/Client/js/'));
});

gulp.task('updateServer', function() {
  return gulp.src('src/Server/*.js').pipe(gulp.dest('public/Server/'));
});

gulp.task('sass', function() {
  return gulp
    .src('src/Client/scss/*.scss')
    .pipe(
      sass().on('error', function(e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest('public/Client/css/'));
});

gulp.task('imagemin', function() {
  return gulp
    .src('src/Client/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/Client/assets/img/'));
});

gulp.task('watch', function() {
  return (
    gulp.watch('src/Client/scss/*.scss', gulp.series('sass')),
    gulp.watch('src/*', gulp.series('update')),
    gulp.watch('src/Server/', gulp.series('updateServer'))
  );
});
