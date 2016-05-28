module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
    src: ['src/js/**/*.js']
  },
  });

  grunt.registerTask('default', ['jshint']);

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
