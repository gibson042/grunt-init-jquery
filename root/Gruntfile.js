'use strict';

module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('{%= jqueryjson %}'),
		basename: 'jquery.<%= pkg.name %>',
		banner: [
			'/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> ' +
				'(<%= grunt.template.today("yyyy-mm-dd") %>)',
			'<%= pkg.homepage ? " * " + pkg.homepage : "" %>',
			' * Licensed <%= _.pluck(pkg.licenses, "type").concat(["public domain"]).join("; ") %>',
			' * ♡ <%= pkg.author.name %>. Please copy and share. http://copyheart.org',
			' */'
		].filter(function( line ) { return line; }).join('\n') + '\n',
		minBanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> |' +
			' <%= pkg.licenses[0].url %> |' +
			' ♡ <%= pkg.author.name %>' +
			' */',

		// Task configuration
		clean: {
			files: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['src/<%= pkg.name %>.js'],
				dest: 'dist/<%= basename %>.js'
			},
		},
		uglify: {
			options: {
				banner: '<%= minBanner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/<%= basename %>.min.js'
			},
		},
		qunit: {
			files: ['test/**/*.html']
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/**/*.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/**/*.js']
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'qunit']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},
		},
	});

	// These plugins provide necessary tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'qunit']);

};
