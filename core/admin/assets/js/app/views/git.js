
define([
    'backbone',
    'routes'
  ], 
  function (Backbone, routes) {

      return Backbone.View.extend({
        el:           '.git-commander-wrap',
        events:       {
          'show'                          : 'show',
          'hide'                          : 'hide',
          'click .overlay'                : 'hide',
          'keydown .input'                : 'handleKeypress'
        },
        render:       function() { },
        initialize:   function() {
        },

        show: function(){ 
          this.$el.find('.input').focus();
          this.$el.addClass('shown');
        },

        hide: function(){ 
          this.$el.find('.output').val('');
          this.$el.removeClass('shown');
        },

        submit: function(e){
          var self = this;
          var $target = $(e.target);

          $.post( routes.git.submit, { cmd: $target.val() }, function(d){
            var msg = (d && d.message && d.message.length == 0) ? 'No output.' : d.message
            self.$el.find('.output').val('').val( msg )
          });

          $target.val('')
        },

        handleKeypress: function(e){
          
          switch( e.which ) 
          {

            // ESCAPE
            case 27:
              this.hide();
              break;

            // ENTER
            case 13:
              this.submit(e);
            break;

            default:
              /* do nothing */
          }

        }

      });

});