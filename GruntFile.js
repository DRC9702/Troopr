module.exports = function configure(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('test', [
        'connect',
        'jasmine'
    ]);
    grunt.registerTask('travis', [
        'eslint:main',
        'test',
        'build-prod'
    ]);
};
