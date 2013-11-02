
// Configure the app.
// ------------------
require.config({
  baseUrl: "/admin/js",
  paths: {
    "underscore":               "vendor/lodash.underscore",
    "backbone":                 "vendor/backbone",
    "jquery":                   "vendor/jquery",
    "fastclick":                "vendor/fastclick",
    "codemirror":               "vendor/codemirror/lib/codemirror",
    "codemirror-placeholder":   "vendor/codemirror/addon/display/placeholder"
  },
  shim: {
    "underscore":               { exports: "_" },
    "backbone":                 { exports: "Backbone", deps: ['underscore', 'jquery'] },
    "codemirror-placeholder":   { deps: ['codemirror'] }
  },
  waitSeconds: 15
});
 
// Then bootstrap the app.
// -----------------------
require( [
    "jquery",
    "app/views/main",
    "app/views/editor",
    "app/views/git",
    "routes",
    "codemirror",
    "codemirror-placeholder",
    "fastclick"
  ],
  function($, MainView, EditorView, GitCommanderView, routes) {

    $(document).ready(function(){
      new MainView().render();
      new EditorView().render();
      new GitCommanderView().render();
    });

  }
);