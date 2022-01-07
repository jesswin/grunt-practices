module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-terser");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-string-replace");
  grunt.initConfig({
    "string-replace": {
      dist: {
        files: [
          {
            expand: true,
            src: "./src/index.html",
            dest: "dist/build",
          },
        ],
        options: {
          replacements: [
            {
              pattern:
                /<script src="^(?:[/w]\/:|\/\/)(\/\/[a-z_\/-\/s0-9\/.]+)+\/.js$"><\/script>/,
              replacement:
                /<script src="^(?:[/w]\/:|\/\/)(\/\/[a-z_\/-\/s0-9\/.]+)+\/.min.js$"><\/script>/,
            },
          ],
        },
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ["./src/index.html", "./src/css/*"],
            dest: "./dist/build",
            filter: "isFile",
          },
        ],
      },
    },
    terser: {
      pages: {
        files: [
          {
            expand: true,
            src: "./src/**/*.js",
            dest: "./dist/build",
            ext: ".min.js",
          },
        ],
      },
    },
    clean: {
      build: ["./src/main.js"],
      release: ["./dist/build/src/main.min.js"],
    },
    handlebars: {
      compile: {
        options: {
          processName: function (filePath) {
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].replace(".handlebars", "");
          },
          namespace: "Shopping",
          partialRegex: /.*/,
          partialsPathRegex: /\/partials\//,
        },
        files: {
          "src/main.js": "./src/templates/**/*.handlebars",
        },
      },
    },
  });
  grunt.registerTask("prodbuild", [
    "clean:release",
    "terser",
    "copy",
    "string-replace",
  ]);
  grunt.registerTask("devbuild", ["clean:build", "handlebars"]);
};
