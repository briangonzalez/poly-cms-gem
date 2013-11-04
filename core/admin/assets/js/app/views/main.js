
define([
    'backbone',
    'routes'
  ], 
  function (Backbone, routes) {

  var MainView = Backbone.View.extend({
    el:           'body',
    events:       {
      "click .login-box button.login": "login"
    },
    render:       function() { },
    initialize:   function() {
      this.watch();
      this.handleLogoutHash();
    },

    login: function(e){
      this.$el.find('.login-box button.login')
              .text('Logging in')
      navigator.id.request();
    },

    logout: function(){
      navigator.id.logout();
    },

    handleLogoutHash: function(){
      if (window.location.hash == '#logout')
        this.logout()
    },

    watch: function(){
      var self = this;
      navigator.id.watch({
        onlogin: function(assertion) {
          self.verifyAssertion(assertion);
        },
        onlogout: function() {
          $.get( routes.admin.logout )
        },
        loggedInUser: undefined
      });
    },

    verifyAssertion: function(assertion){
      $.post( routes.admin.verify, { assertion: assertion, audience: location.host }, 
        function onSuccess(data) {
          console.log("** Assertion response:", data)
          if (data.status === 'okay')
            window.location = '/admin'
        });
    }

  });

  return MainView;

});