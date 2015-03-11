module.exports = function(grunt) {

  grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		coffee: {
			compileJoined: {
				options: {
					join: true
				},
				files: {
					"track-dev.js": ["coffeescript/*.coffee"]
				}
	    }
	  },
    uglify: {
      js: {
				files: {
					"../track.js": ["track-dev.js"],
					"../../../vendor/track.js": ["track-dev.js"]
				}
      }
    },
		watch: {
		  js: {
		    files: ["coffeescript/*.coffee"],
		    tasks: ["coffee", "uglify"]
		  }
		}
  });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["coffee", "uglify"]);

};