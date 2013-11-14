
define([
    'backbone',
    'routes',
    'app/file-ext',
    'fastclick'
  ], 
  function (Backbone, routes, extensions) {

    return Backbone.View.extend({
      el:           'body',
      events:       {
        "keyup .CodeMirror":                          "contentChanged",
        'click .CodeMirror':                          "fastClick",
        'click .content':                             "toggleDrawer",
        'click .content .top-bar .open-drawer':       "toggleDrawer",
        'click .content .top-bar .logout':            "logout",
        'click .content .top-bar .git':               "showGitCommander",
        'click .content .top-bar .cache':             "clearCache",
        'click .content .top-bar .save':              "saveFile",
        'click .drawer .top-bar .action.new':         "createFile",
        'click .drawer .top-bar .action.delete':      "deleteFile",
        'click .drawer .top-bar .action.move':        "moveFile",
        'click .drawer .top-bar .action.refresh':     "refreshFileTree",
        'click .drawer .top-bar .action.upload':      "showFileUploader",
        'click .file-tree li[data-type="dir"]':       "expandDirectory",
        'click .file-tree li[data-type="file"]':      "loadFile",
        'change .bottom-bar select.font-size':        "changeFontSize",
        'change .bottom-bar select.mode':             "changeMode",
        'click .bottom-bar span.file':                "saveFile",
        'mode-received':                              "setMode",
        'keyup':                                      "handleKeyup",
        'dragenter .upload-overlay':                  "highlightFileUploader",
        'dragleave .upload-overlay':                  "unhighlightFileUploader",
        'drop .upload-overlay':                       "uploadFileViaDrop",
        'click .upload-overlay .close':               "hideFileUploader",
        'click .upload-overlay .manual-upload':       "toggleManualUploader",
        'change .upload-overlay form input':          "uploadFileViaManual"
      },

      render:       function() {
        this.$editor = this.$el.find('#editor');

        if ( this.$editor.length > 0 ) {
          this.cm = window.CodeMirror.fromTextArea( this.$editor.get(0), {
            theme:  'solarized',
            textWrapping: true,
            lineWrapping: true,
            readOnly: 'nocursor',
            placeholder: "No content to display.",
            indentUnit: 2,
            click: function(){ alert(f) },
            extraKeys: { Tab: this.betterTab.bind(this) }
          });

          this.fastClick();
          this.delegateEvents();
        }
      },

      initialize:   function() {
        this.loadedFile;
        this.altered    = false;
        this.bindSave();

        // Ignore default dragover.
        $(document).on('dragover', function(ev){
          ev.preventDefault()
        })
      },

      fastClick: function(){
        this.$el.find('.CodeMirror *').addClass('needsclick')
        FastClick.attach(document.body);
      },

      changeFontSize: function(ev){
        var oldSize       = this.currentSize || 14;
        this.currentSize  = parseInt( $(ev.target).val() );

        this.$el.find('.CodeMirror')
                .addClass( 'size-' + this.currentSize )
                .removeClass( 'size-' + oldSize );
        this.cm.refresh();
      },

      changeMode: function(ev){
        var self = this;
        this.mode = $(ev.target).val();

        if (this.mode === 'plain'){
          this.cm.setOption( 'mode', null )
        }
        else if ( window.CodeMirror.modes[this.mode] ){
          this.setMode();
        } else{
          this.loadMode(this.mode);
        }
      },

      setMode: function(){
        var loaded = false;
          try{
            this.$el.find('.CodeMirror').attr('data-mode', this.mode)
            this.cm.setOption( 'mode', this.mode );
            loaded = true;
          } catch(e){ /* nothing to do */ }
      },

      loadMode: function(mode){
        var self  = this;
        var route = [routes.codemirror.modes, mode, mode].join('/');

        require( [route], function(){
          var deps = window.CodeMirror.modes[mode].dependencies;
          _.each( deps, function(m){ self.loadMode(m) });
          self.$el.trigger('mode-received')
        })

      },

      loadModeForFile: function(){
        var ext = this.loadedFile.split('.').pop();
        if (extensions[ext]){
          var mode = extensions[ext];
          this.$el.find('select.mode .cm-' + mode).attr('selected', 'selected')
          this.mode = mode;
          this.loadMode( mode )
        }
      },

      contentChanged: function(o){
        this.showUnsaved();
      },

      toggleDrawer: function(ev){
        var action = (ev && $(ev.target).hasClass('open-drawer')) ? 'toggle' : 'remove';
        this.$el.find('.content')[action+'Class']('out');
        ev && ev.stopPropagation();
      },

      expandDirectory: function(ev){
        var $target = $(ev.target);
        this.handleDirExpansion( $target );

        if ( !$target.data('fetched') ){
          $.get(  routes.file.files, 
                  { id:       $target.data('id'), 
                    level:    $target.data('level'),
                    template: true
                  }, function(data){
                      $target.after(
                        $('<div>', { class: 'dir-contents' }).html( data.items )
                      );
                  });
        }

        $target.data('fetched', 1)
      },

      handleDirExpansion: function($target){

        if ( $target.hasClass('expanded') ){
          $target.removeClass('expanded');
          $target.next('.dir-contents').hide();
        }
        else {
          $target.addClass('expanded');
          $target.next('.dir-contents').show();
        }

      },

      loadFile: function(ev){
        var self    = this;
        var $target = $(ev.target);
        var id      = $target.attr('data-id'); 
        var base    = $target.attr('data-base'); 

        if ( id === this.loadedFile )
          return;

        if ( this.unsaved ){
          var c = confirm('Unsaved changes to ' + this.loadedFile + ' will be lost. Continue?')
          if (!c)
            return;
        }

        this.$el.find(".file-tree li[data-type='file']")
                 .removeClass('loaded')

        $target.addClass('loaded');

        $.get(routes.file.base, { id:id }, function(data){
          self.cm.setValue( data.contents );
          self.loadedFile = id;
          self.cm.setOption( 'readOnly', false )
          self.cm.refresh();
          self.loadModeForFile();
        });

        this.hideUnsaved();
        this.$el.find('.bottom-bar span.file').text( base )
      },

      showUnsaved: function(){
        this.unsaved = true;
        this.$el.find('.content .top-bar .save').addClass('unsaved');
        this.$el.find('.bottom-bar span.file').addClass('unsaved');
      },

      hideUnsaved: function(){
        this.unsaved = false;
        this.$el.find('.content .top-bar .save').removeClass('unsaved');
        this.$el.find('.bottom-bar span.file').removeClass('unsaved');
      },

      bindSave: function(){
        var self = this;
        $(window).on('keydown', function(event){
          if ( (event.ctrlKey || event.metaKey) && (event.which == 83) ) {
            event.preventDefault();
            self.saveFile();
            return false;
          }
          return true;
        });
      },

      saveFile: function(){
        var self = this;
        if (!this.loadedFile) return;

        $.post( routes.file.base , { content: this.cm.getValue(), id: this.loadedFile }, function(d){
          setTimeout( function(){ 
            self.hideUnsaved();
          }, 100 );
        });
      },

      createFile: function(){
        var self = this;
        var file = prompt('Path to new file (eg. /path/to/file.txt):')
        if (!file || file.length < 1) return

        $.post( routes.file.create, { path: file }, function(d){
          alert(d.message);
          self.refreshFileTree();
        })
      },

      deleteFile: function(){
        var self = this;
        if (!this.loadedFile) return;

        var c = confirm('Really delete ' + this.loadedFile + '?')
        if (!c) return;

        $.post( routes.file.dlt , { id: this.loadedFile }, function(d){
          setTimeout( function(){ 
            self.hideUnsaved();
            self.removeLoadedFile();
            self.cm.setValue('');
          }, 100 );
        });
      },

      moveFile: function(){
        var self = this;
        if (!this.loadedFile) return;

        var path = prompt('Path to move ' + this.loadedFile + " to?")
        if (!path || path.length < 1) return

        $.post( routes.file.move, { id: this.loadedFile, moveto: path }, function(d){
          self.refreshFileTree();
          self.cm.setValue('');
        });
      },

      removeLoadedFile: function(id){
        this.$el.find( 'li.loaded').remove()
        this.$el.find('.bottom-bar span.file').text( '...' )
      },

      refreshFileTree: function(){
        var self = this;
        this.loadedFile = false;
        $.get(routes.file.tree, function(response){
          self.$el.find('.file-tree').empty().html(response);
          self.delegateEvents();
        });
      },

      showFileUploader: function(){
        this.$el.find('.upload-overlay')
                .addClass('shown')
      },

      hideFileUploader: function(){
        this.$el.find('.upload-overlay')
                .removeClass('shown');
        this.$el.find('.upload-overlay form')
                .hide()
      },

      highlightFileUploader: function(){
        this.$el.find('.upload-overlay')
                .addClass('highlight')
      },

      unhighlightFileUploader: function(){
        this.$el.find('.upload-overlay')
                .removeClass('highlight')
      },

      clearCache: function(){
        $.get( routes.cache.clear, function(){
          alert('Successfully cleared the cache.')
        })
      },

      showGitCommander: function(){
        this.$el.find('.git-commander-wrap').addClass('shown')
      },

      hideGitCommander: function(){
        this.$el.find('.git-commander-wrap .overlay').click()
      },

      logout: function(){
        window.location = routes.admin.logout;
      },

      betterTab: function(){
        var cm = this.cm;

        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
            Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
        }        
      },   

      handleKeyup: function(ev){
        if ( ev.which == 27 ) {
          this.hideFileUploader();
          this.hideGitCommander();
        } 
      },

      uploadFileViaDrop: function(ev){
        ev.preventDefault();
        this.unhighlightFileUploader();
        var files = ev.originalEvent.dataTransfer.files;

        if (files.length > 0) {
          // Loop over each file, appending it to the 
          // FormData object
          var data = new FormData();
          $.each(files, function(i, file) { 
            data.append('file-' + i, file); 
          });

          this.ajaxUploadFile(data)
        }
      },

      ajaxUploadFile: function(formData){
        var self = this;
        // Grab the old text.
        var $uploadText = this.$el.find('.upload-overlay .text')
        var oldHTML = $uploadText.html();
        var resetUploadText = function(){$uploadText.html(oldHTML) }

        // Then upload the file.
        $.ajax({
          data: formData,
          url: routes.file.upload,  //Server script to process data
          type: 'POST',
          xhr: function() {  // Custom XMLHttpRequest
              var myXhr = $.ajaxSettings.xhr();
              if(myXhr.upload){ // Check if upload property exists
                  myXhr.upload.addEventListener('progress', function(d){
                    $uploadText.text( Math.floor( (d.position/d.total)*100 ) + '%' )
                  }, false); // For handling the progress of the upload
              }
              return myXhr;
          },
          beforeSend: function(){
            $uploadText.text('Please wait...')
          },
          success: function(d){
            self.refreshFileTree()
            $uploadText.text( d.message )
            setTimeout(function(){ resetUploadText() }, 1500)
          },
          error: function(){
            $uploadText.text(['Error while uploading'].join(' '))
            setTimeout(function(){ resetUploadText() }, 1500)
          },
          cache: false,
          contentType: false,
          processData: false
        });
      },

      uploadFileViaManual: function(ev){
        var data = new FormData( $(ev.target).parent().get(0) );
        this.ajaxUploadFile(data)
      },

      toggleManualUploader: function(){
        this.$el.find('.upload-overlay form').toggle()
      }

    });

});