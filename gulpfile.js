var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function(){
  nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['./node-modules/**']
  })
  .on('restart', function(){
    console.log("RESTARTING SERVER");
  });
});
