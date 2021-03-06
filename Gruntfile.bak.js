module.exports = function( grunt ) {
 
    grunt.initConfig({
        clean:  {
            main: ['dist/**'],
            dist: [
                'dist/app/css/style.css'
                , 'dist/app/css/all.css'
                , 'dist/app/js/all.js'
                , 'dist/app/js/directives.js'
                , 'dist/app/js/filters.js'
                , 'dist/app/js/app.js'
                , 'dist/app/js/controllers.js'
                , 'dist/app/js/services.js'
                , 'dist/app/js/services.js'
                , 'dist/app/modules/cities/css/**'
                , 'dist/app/modules/cities/js/**'
                , 'dist/app/modules/cities/*.js'
                , 'dist/app/modules/login/css/**'
                , 'dist/app/modules/login/js/**'
                , 'dist/app/modules/login/*.js'
                , 'dist/app/modules/states/css/**'
                , 'dist/app/modules/states/js/**'
                , 'dist/app/modules/states/*.js'
                , 'dist/app/modules/users/css/**'
                , 'dist/app/modules/users/js/**'
                , 'dist/app/modules/users/*.js'
            ]
       },
       
       copy: {
          main: {
            files: [
              {expand: true, src: ['app/**'], dest: 'dist/'}
            ]
          },
        },
       
       concat: {
            options: {
              separator: '\n\n',
            },
            css: {
                src: [
                    'dist/app/lib/boostrap/dist/css/bootstrap.css'
                    , 'dist/app/lib/boostrap/dist/css/bootstrap-theme.css'
                    , 'dist/app/css/*.css'
                ],
                dest: 'dist/app/css/all.css'
            },
            js: {
                src: [
                    'dist/app/js/*.js'
                    , 'dist/app/modules/login/*.js'
                    , 'dist/app/modules/login/js/*.js'
                    , 'dist/app/modules/users/*.js'
                    , 'dist/app/modules/users/js/*.js'
                    , 'dist/app/modules/states/*.js'
                    , 'dist/app/modules/states/js/*.js'
                    , 'dist/app/modules/cities/*.js'
                    , 'dist/app/modules/cities/js/*.js'
                ],
                dest: 'dist/app/js/all.js'
            }
        },
        
        cssmin: {
            target: {
                files: { 'dist/app/css/all.min.css': ['dist/app/css/all.css'] }    
            }
        },
        
        uglify : {
            target: {
                files: { 'dist/app/js/all.min.js': ['dist/app/js/all.js'] }
            }
        },
        
        processhtml: {
        	dist: {
              files: {
                'dist/app/index.html': ['dist/app/index.html']
              }
            }
      	}
    });
  
    // Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', [
        'clean:main', 'copy', 'concat'
        , 'cssmin', 'uglify', 'processhtml'
        , 'clean:dist'
    ]);
    
};
