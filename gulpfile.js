const gulp = require('gulp');
const sass = require('gulp-sass');
const prettier = require('gulp-prettier');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');

gulp.task('update', function(){
  return gulp.src('src/*')
  .pipe(gulp.dest('public/'))
});

gulp.task('updateJS', function(){
  return gulp.src('src/Client/js/*.js')
  .pipe(gulp.dest('public/Client/js/'))
});

gulp.task('updateServer', function(){
  return gulp.src('src/Server/*.js')
  .pipe(gulp.dest('public/Server/'))
});

gulp.task('sass', function(){
  return gulp.src('src/Client/scss/*.scss')
  .pipe(sass().on('error', function(e){
    console.log(e);
  }))
  .pipe(gulp.dest('public/Client/css/'))
});

gulp.task('prettier', function(){
  let js = gulp.src('src/Client/js/*.js')
  .pipe(prettier({singleQuote: true}))
  .pipe(gulp.dest('src/Client/js/*.js'))

  let server = gulp.src('src/Server/*.js')
  .pipe(prettier({singleQuote: true}))
  .pipe(gulp.dest('public/Server/'))

  return merge(js, server);
});

gulp.task('imagemin', function(){
  return gulp.src('src/Client/assets/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/Client/assets/img/'))
});

gulp.task('watch', function(){
  return gulp.watch('src/Client/scss/*.scss', gulp.series('sass')),
  gulp.watch('src/Client/js/*.js', gulp.series('prettier')),
  gulp.watch('src/Server/', gulp.series('prettier')),
  gulp.watch('src/*', gulp.series('update')),
  gulp.watch('src/Server/', gulp.series('updateServer'));
})