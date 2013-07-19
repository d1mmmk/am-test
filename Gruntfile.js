'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    vars: {
      port: 8080,
      js_source_dir: "source/js",
      coffee_source_dir: "source/coffee",
      js_build_dir: "build",
      sass_dir: "source/sass",
      js_dir: "js",
      css_dir: "css",
    },
    compass: {
      app: {
        options: {
          config: "config.rb"
        }
      }
    },
    'closure-compiler': {
      frontend: {
        closurePath: '/home/d1mmmk/closure-compiler',
        js: '<%=vars.js_build_dir%>/app.js', //входные данные
        jsOutputFile: '<%=vars.js_dir%>/app.min.js', //выходные
        noreport: true, //означает что в папке js не будет создаваться txt файл с отчетом
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          externs: [
            '<%=vars.js_dir%>/jquery.js', 
            ], 
          // formatting: 'pretty_print',
          warning_level: 'QUIET',
        }
      }
    },
    connect: {
      server: {
        options: {
          port: "<%= vars.port %>",
          keepalive: true,
          base: '.',
          static: '.'
        }
      }
    },
    coffee: {
      app: {
        files: {
          '<%=vars.js_build_dir%>/app.js': '<%=vars.coffee_source_dir %>/app.coffee',
        }
      },
    },
    htmlhint: {
      app: {
        options: {
          'tag-pair': true
        },
        src: ['*.html'],
      }
    },
    watch: {
      coffee: {
        files: [
          '<%=vars.coffee_source_dir%>/**/*.coffee',
          ],
        tasks: ['coffee','closure-compiler']
      },
      css: {
        files: "<%= vars.sass_dir %>/**/*.scss",
        tasks: ['compass'],
        options: {
          livereload: 1337,
        },
      },
      html: {
        files: "*.html",
        tasks: ['htmlhint'],
        options: {
          livereload: 1337,
        },
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-htmlhint');

  // Default task.
  grunt.registerTask('default', ['htmlhint','coffee', 'closure-compiler', 'connect']);

};
