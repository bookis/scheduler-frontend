module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-http-server');

  grunt.initConfig
    "http-server":
      dev:
        root: ".",
        host: "localhost",
        port: 4000,
        runInBackground: true
    watch:
      coffee:
        files: 'src/*.coffee'
        tasks: ['coffee:compile']
      sass:
        files: 'src/scss/*.scss'
        tasks: ['sass']
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/main.css': 'src/scss/main.scss'
        }
      }
    },
    coffee:
      compile:
        expand: true,
        flatten: true,
        cwd: "#{__dirname}/src/",
        files:
          "js/app.js": ['src/*.coffee']

  grunt.registerTask('default', ['watch']);
