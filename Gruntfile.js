// module.exports = function(grunt) {
//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     jshint: {
//       src: ['public/src/js/**/*.js']
//     },
//     sass: {
//       expanded: {
//         options: { outputStyle: 'expanded' },
//         files: { 'public/css/app.css': 'public/src/scss/app.scss' }
//       },
//       compressed: {
//         options: { outputStyle: 'compressed' },
//         files: { 'public/css/app.min.css': 'public/src/scss/app.scss' }
//       }
//     },
//     concat: {
//       dist: {
//         src: ['public/src/js/app.js', 'public/src/js/**/*.js'],
//         dest: 'public/js/app.js'
//       }
//     },
//     uglify: {
//       'public/js/app.min.js': 'public/js/app.js'
//     },
//     watch: {
//       configFiles: {
//         files: ['Gruntfile.js', 'package.json'],
//         options: { reload: true }
//       },
//       scss: {
//         files: ['public/src/scss/**/*.scss'],
//         tasks: ['sass'],
//         options: { livereload: true }
//       },
//       js: {
//         files: ['public/src/js/**/*.js'],
//         tasks: ['jshint', 'concat', 'uglify'],
//         options: { livereload: true }
//       },
//       index: {
//         files: ['index.html'],
//         options: { livereload: true }
//       }
//     }
//   });
//
//   require('load-grunt-tasks')(grunt);
//
//   grunt.registerTask('default', ['jshint', 'sass', 'concat', 'uglify', 'watch']);
//
// };
