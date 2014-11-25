(function () {
  'use strict';
  module.exports = function (grunt) {
    // require it at the top and pass in the grunt instance
    // it will measure how long things take for performance
    //testing
    require('time-grunt')(grunt);

    // load-grunt will read the package file and automatically
    // load all our packages configured there. 
    // Yay for laziness
    require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Hint the grunt file and all files under js/ 
    // and one directory below
    jshint: {
      files: ['Gruntfile.js', 'js/{,*/}*.js'],
      options: {
        // options here to override JSHint defaults
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      main: {
        files: [{
          expand: true,
          cwd: 'css',
          src: '*.css',
          dest: 'css',
          ext: '.prefixed.css',
          extDot: 'last'
        }]
      }
    },

    watch: {
      options: {
        nospawn: true,
      },
      // Watch all javascript files and hint them
      js: {
        files: ['js/{,*/}*.js'],
        tasks: ['jshint']
      },
      // watch all css files and auto prefix if needed
      styles: {
        files: [ 'css/{,*/}*.css' ],
        tasks: ['autoprefixer:main']
      },
      // watch the html files, vulcanize and publish
      html: {
        files: ['*.html'],
        tasks: ['vulcanize:elements']
      }
    },

  // Vulcanize elements.html to reduce the number of 
  // network requests
  vulcanize: {
    elements: {
      options: {
        strip: true
      },
      files: {
        'element-vulcanized.html': 'elements.html'
      }
    }
  },

'gh-pages': {
    options: {
      add: true,
      message: 'Content committed from Grunt gh-pages'
    },
    'all': {
      // These files will get pushed to the `
      // gh-pages` branch (the default).
      src: ['**/*']
    }
  }
  }); // closes initConfig
  }; // closes module.exports
}()); // closes the use strict function