/*!
 * my gruntfile
 * http://kzhrk.com/
 *
 * Copyright (c) 2013 Kobayashi Kazuhiro
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

  var RE_USE_STRICT_STATEMENT = /(^|\n)[ \t]*'use strict';?\s*/g,
      BANNER_TEMPLATE_STRING  = '/*! <%= pkg.name %> - v<%= pkg.version %> ( <%= grunt.template.today("yyyy-mm-dd") %> ) - <%= pkg.license %> */',
      BUILD_ORDERED_LIST = [
        'src/js/lib/**/*.js',
        'src/js/script/**/*.js'
      ];

  /*
   * grunt.initConfig
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dest',
          livereload: 35729
        }
      },
      docs: {
        options: {
          port: 9002,
          base: 'docs',
          livereload: 35729
        }
      }
    },
    watch: {
      reload: {
        files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', '**/*.{png,jpg,jpeg,gif}'],
        options: {
          livereload: 35729
        }
      },
      html: {
        files: ['src/**/*.jade', 'src/json/**/*.json'],
        tasks: ['jade:dev']
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['copy:js', 'yuidoc', 'concat']
      },
      img: {
        files: ['src/**/*.{png,jpg,jpeg,gif}'],
        tasks: ['imagemin']
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'src/',
        src: ['**/*', '!scss/**', '!ts/**', '!jade/**', '!**/*.jade'],
        dest: 'dest/'
      },
      pro: {
        expand: true,
        cwd: 'src/',
        src: ['js/*.js'],
        dest: 'dest/'
      },
      js: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'dest/'
      }
    },
    clean: {
      dest: ['dest']
    },
    concat: {
      options: {
        stripBanners: false,
        banner: [BANNER_TEMPLATE_STRING,
                 '(function(window) {',
                 '',
                 '"use strict";',
                 '',
                 ''].join('\n'),
        footer: ['',
                 '})(window);'].join('\n')
      },
      dist: {
        src: BUILD_ORDERED_LIST,
        dest: 'dest/js/main.js',
        options: {
          process: function(content) {
            return content.replace(RE_USE_STRICT_STATEMENT, '$1');
          }
        }
      }
    },
    uglify: {
      pro: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'dest/js/main.js': ['dest/js/main.js']
        }
      }
    },
    jade: {
      dev: {
        options: {
          client: false,
          pretty: true,
          data: function(dest, src){
            var jsonFile  = src[0].replace('src', './src/json').replace('jade', 'json');
            return require(jsonFile);
          }
        },
        expand: true,
        cwd: 'src',
        src: ['**/*.jade', '!inc/**/*.jade'],
        dest: 'dest',
        rename: function(dest, src) {
          return dest + '/' + src.replace(/\.jade$/, '.html');
        }
      },
      pro: {
        options: {
          client: false,
          pretty: false,
          data: function(dest, src){
            var jsonFile  = src[0].replace('src', './src/json').replace('jade', 'json');
            return require(jsonFile);
          }
        },
        expand: true,
        cwd: 'src',
        src: ['**/*.jade', '!inc/**/*.jade'],
        dest: 'dest',
        rename: function(dest, src) {
          return dest + '/' + src.replace(/\.jade$/, '.html');
        }
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'dest/css',
          environment: 'development',
          outputStyle: 'nested'
        }
      },
      pro: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'dest/css',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }      
    },
    imagemin: {
      dest: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dest/'
        }]
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'dest/js',
          outdir: 'docs/'
        }
      }
    }
  });

  // load
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  /*
   * task
   */

  // default task
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('refresh', ['clean:dest', 'jade:dev', 'compass:dev', 'copy:js', 'yuidoc', 'concat', 'imagemin']);
  grunt.registerTask('production', ['clean:dest', 'jade:pro', 'compass:pro', 'concat', 'copy:pro', 'uglify', 'imagemin']);
};
