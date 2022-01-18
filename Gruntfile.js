module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-terser");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-string-replace");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({
    // concat: {
    //   dist: {
    //     src: [
    //       "./src/data/aside.js",
    //       "./src/data/header.js",
    //       "./src/data/footer.js",
    //     ],
    //     dest: "dist/build/data/data.js",
    //   },
    // },

    "string-replace": {
      dev: {
        files: [
          {
            expand: true,
            cwd: "./src",
            src: "index.html",
            dest: "dist/dev-build",
          },
        ],
        options: {
          replacements: [
            {
              pattern: '<script src="{main}"></script>',
              replacement: "",
            },
            {
              pattern: /{handlebar}/gi,
              replacement: "./lib/handlebars-v4.7.7.js",
            },
            {
              pattern: /{data}/gi,
              replacement: "./data/data.js",
            },
            {
              pattern: /{index}/gi,
              replacement: "./js/dev-index.js",
            },
            {
              pattern: /{loadTemplates}/gi,
              replacement: "loadCompileTimeTemplates()",
            },
          ],
        },
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: "./src",
            src: "index.html",
            dest: "dist/build",
          },
        ],
        options: {
          replacements: [
            {
              pattern: /{handlebar}/gi,
              replacement: "./lib/handlebars.runtime-v4.7.7.js",
            },
            {
              pattern: /{main}/gi,
              replacement: "./main.min.js",
            },
            {
              pattern: /{data}/gi,
              replacement: "./data/data.min.js",
            },
            {
              pattern: /{index}/gi,
              replacement: "./js/prod-index.min.js",
            },
            {
              pattern: /{loadTemplates}/gi,
              replacement: "loadRuntimeTemplates()",
            },
          ],
        },
      },
    },

    copy: {
      prod: {
        files: [
          {
            cwd: "./src",
            expand: true,
            src: [
              "index.html",
              "css/*.css",
              "lib/**/*.js",
              "!lib/handlebars-v4.7.7.js",
            ],
            dest: "./dist/build",
            filter: "isFile",
          },
        ],
      },
      dev: {
        files: [
          {
            cwd: "./src",
            expand: true,
            src: [
              "index.html",
              "css/*.css",
              "js/dev-index.js",
              "data/*.js",
              "lib/**/*.js",
              "templates/**/*.handlebars",
              "!lib/handlebars.runtime-v4.7.7.js",
            ],
            dest: "./dist/dev-build",
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
            cwd: "./src",
            src: ["js/prod-index.js", "data/*.js"],
            dest: "./dist/build/",
            ext: ".min.js",
          },
        ],
      },
      js: {
        files: [
          {
            expand: true,
            cwd: "./dist/build",
            src: ["main.min.js"],
            dest: "./dist/build/",
            ext: ".min.js",
          },
        ],
      },
    },

    clean: "./dist/",

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
        files: [
          {
            src: "./**/templates/**/*.handlebars",
            dest: "./dist/build/main.min.js",
          },
        ],
      },
    },
  });
  grunt.registerTask("prod", [
    "clean",
    "handlebars",
    "terser:pages",
    "terser:js",
    "copy:prod",
    "string-replace:prod",
  ]);
  grunt.registerTask("dev", ["clean", "copy:dev", "string-replace:dev"]);
};
