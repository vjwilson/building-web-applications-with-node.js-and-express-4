var gulp = require('gulp');
var eslint = require('gulp-eslint');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var options = {
    bowerJson: require('./bower.json'),
    directory: 'public/lib'
  };

  return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(gulp.dest('./src/views'));
});
