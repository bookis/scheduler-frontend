module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-wiredep')
  grunt.loadNpmTasks('grunt-http-server');

  grunt.initConfig
    "http-server":
      dev:
        root: ".",
        host: "localhost",
        port: 4000,
        runInBackground: false
    watch:
      coffee:
        files: 'src/*.coffee'
        tasks: ['coffee:compile']

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
