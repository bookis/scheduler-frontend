module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-wiredep')
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig
    "http-server":
      dev:
        root: ".",
        host: "localhost",
        port: 8080,
        runInBackground: false
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
        src: ['*.coffee'],
        dest: 'js/',
        ext: '.js'
    wiredep:
      task:
        src: [
          "*.html"
        ]
