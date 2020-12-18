var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cleancss = require('gulp-clean-css'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  sass = require('gulp-ruby-sass')

gulp.task('styles',function(){
  return sass('./src/bootstrap/scss/bootstrap.scss',{style:'expanded'})
  .pipe(autoprefixer('last 3 versions'))
  .pipe(gulp.dest('./public/css/'))
  .pipe(rename({suffix:'.min'}))
  .pipe(cleancss())
  .pipe(gulp.dest('./public/css/'))
  .pipe(notify({message:'Style Compilation Complete'}));
});

gulp.task('watch',function(){
  gulp.watch('./src/bootstrap/scss/**/*.scss',gulp.series('styles'));
})