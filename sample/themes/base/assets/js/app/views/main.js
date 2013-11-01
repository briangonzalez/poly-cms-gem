
define(['backbone'], function (Backbone) {

  var MainView = Backbone.View.extend({
    template:     "/* your template here */",
    events:       {},
    render:       function() { console.log('main view render')  },
    initialize:   function() { console.log('main view init')    }
  });

  return MainView;

});