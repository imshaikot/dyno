/**
 * Created by Shariar Shaikot on 9/30/16.
 */

// const gruntTasks = require('load-grunt-tasks');

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);
  require('time-grunt');

  const dir = {
    src: 'src',
    build: 'build'
  };

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: [
          `${dir.src}/index.html`,
        ]
      },
      less: {
        files: [`${dir.src}/stylesheets/less/*.less`],
        tasks: ['less']
      },
      scripts: {
        files: [
          `${dir.src}/interface/*.js`,
          `${dir.src}/interface/**/*.js`,
          `${dir.src}/interface/**/**/*.js`,
        ],
        tasks: ['browserify'],
      },
    },

    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify"]
          ]
        },
        files: {
          'src/.tmp/app.js': [
            `${dir.src}/interface/*.js`,
            `${dir.src}/interface/**/*.js`,
            `${dir.src}/components/*.js`,]
        }
      }
    },

    less: {
      all: {
        options: {},
        files: {
          "./src/.tmp/app.css" : `${dir.src}/stylesheets/less/main.less`
        }
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          open: true,
          base: `${dir.src}/`,
          port: 6450
        }
      }
    },

    /**
     * Grunt:Build Tasks
     **/

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: false,
          conservativeCollapse: false,
          collapseBooleanAttributes: false,
          removeCommentsFromCDATA: false
        },
        files: {
          'build/index.html' : `${dir.src}/index.html`,
        }
      }
    },
    //ngtemplates: {
    //  dist: {
    //    options: {
    //      htmlmin: '<%= htmlmin.dist.options %>',
    //      usemin: 'vendor.min.js',
    //    },
    //    cwd: 'src',
    //    src: ['interface/views/{,*/}*.html'],
    //    dest: '.tmp/templateCache.js',
    //  },
    //},
    copy: {
      node_modules: {
        expand: true,
        cwd: `${dir.src}/node_modules/`,
        src: ['*'],
        dest: `${dir.build}/node_modules/`
      },
      main: {
        expand: true,
        cwd: `${dir.src}/`,
        src: ['main.js'],
        dest: `${dir.build}/`
      },
      packageJSON: {
        expand: true,
        cwd: `${dir.src}/`,
        src: ['package.json'],
        dest: `${dir.build}/`
      },
      app: {
        expand: true,
        cwd: `${dir.src}/interface`,
        src: ['*.js'],
        dest: `${dir.build}/interface`
      },
      views: {
        expand: true,
        cwd: `${dir.src}/interface/views`,
        src: ['*.html'],
        dest: `${dir.build}/interface/views`
      },
      tmp: {
        expand: true,
        cwd: `${dir.src}/.tmp`,
        src: ['*.js'],
        dest: `${dir.build}/.tmp`
      },
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            `${dir.build}/{,*/}*`,
            `${dir.build}!/.git{,*/}*`,
          ]
        }]
      },
    },
    useminPrepare: {
      html: [`${dir.src}/index.html`],
      options: {
        dest: `${dir.build}/`,
        flow: {
          html: {
            steps: {
              js: ['concat'], //, 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: [`${dir.build}/{,*/}*.html`],
      css: [`${dir.build}/{,*/}*.css`],
      js: [`${dir.build}/{,*/}*.js`],
      options: {
        assetsDirs: [
          `${dir.build}`,
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },
    /** Grunt:Electron tasks **/
    exec: {
      deploy: {
        cmd: function() {
          return 'npm run build';
        }
      },
      debug: {
        cmd: function() {
          return 'npm start';
        }
      },
    },
  });

  grunt.registerTask('serve', [
    'connect',
    'watch',
  ]);

  const target = grunt.option('target') || 'debug';
  grunt.registerTask('build', [
    'clean:dist',
    'copy:node_modules',
    'copy:main',
    'copy:packageJSON',
    // 'copy:app',
    'copy:tmp',
    'copy:views',
    'useminPrepare',
    // 'ngtemplates',
    'concat:generated',
    'cssmin:generated',
    //'uglify:generated',
    'htmlmin',
    'usemin',
    `exec:${target}`,
  ]);
};