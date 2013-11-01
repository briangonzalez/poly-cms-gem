
// Configure the app.
// ------------------
require.config({
  baseUrl: "/js",
  paths: {
    "underscore":   "vendor/lodash.underscore",
    "backbone":     "vendor/backbone",
    "jquery":       "vendor/jquery"
  },
  shim: {
    "underscore":   { exports: "_" },
    "backbone":     { exports: "Backbone", deps: ['underscore', 'jquery'] }
  },
  waitSeconds: 15
});

// Then bootstrap the app.
// -----------------------
require( [
    "jquery",
    "app/views/main"
  ],
  function($, MainView) {

    $(document).ready(function(){
      new MainView().render();
    });

  }
);