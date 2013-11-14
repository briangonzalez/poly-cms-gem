
module Poly
  module CMS
    module Admin
      extend Sinatra::Extension

      UPLOADS_PATH         = 'uploads'
      ADMIN_FILES_PATH    = File.join( Poly::CORE, 'admin' )
      ADMIN_LAYOUTS_PATH  = File.join( ADMIN_FILES_PATH, 'layouts'  )
      ADMIN_PARTIALS_PATH = File.join( ADMIN_FILES_PATH, 'partials'  )
      ADMIN_ASSETS_PATH   = File.join( ADMIN_FILES_PATH, 'assets'  )
      CM_MODES_PATH       = File.join( ADMIN_ASSETS_PATH, 'js', 'vendor', 'codemirror', 'mode'  )

      helpers do
        def logged_in?
          Poly::Lib::Persona.logged_in?(session)
        end

        def files(id)
          Cabi.list(id, { dirs_first: true })
        end

        def admin_partial(path, locals={})
          haml File.read( File.join(ADMIN_PARTIALS_PATH, path) ), {}, locals
        end

        def editor_modes
          ['plain'] + Dir.glob( CM_MODES_PATH + '/*' ).map{ |f|
          next if !File.directory?(f) || ['.', '..'].include?(f)
            File.basename(f) 
          }.compact
        end

        def redirect_if_not_logged_in
          redirect '/admin' if not logged_in?
        end

      end

      get '/admin' do
        @email = session[:auth_email]
        haml File.read( File.join(ADMIN_LAYOUTS_PATH, 'admin.haml') )
      end

      get '/admin/logout' do
        session[:auth_email] = nil
        session.clear
        redirect "/admin#logout"
      end

      get '/admin/files' do
        redirect_if_not_logged_in

        items = files( params[:id] + ':*' )
        items.map!{ |i| admin_partial('_treeitem.haml', { item: i, level: params[:level].to_i + 1 }) }.join('') if params[:template]

        content_type :json
        { items: items }.to_json
      end

      get '/admin/file' do
        redirect_if_not_logged_in
        content_type :json
        { contents: Cabi.read(params[:id], { no_yaml: true }) }.to_json
      end

      post '/admin/file' do
        redirect_if_not_logged_in
        Cabi.write( params[:id], params[:content] )

        content_type :json
        { message: 'ok' }.to_json
      end

      post '/admin/file/upload' do
        redirect_if_not_logged_in

        if params.has_key?('files') 
          # Manual upload
          files = params[:files]
        else 
          # Drag & drop upload
          files = params.reject{ |key, data|
              !(data.is_a?(Hash) and data.has_key?(:tempfile))
            }.values
        end

        files.each do |file|
          FileUtils.mv(
              file[:tempfile],
              File.join( Poly::CMS::Admin::UPLOADS_PATH, file[:filename] ),
              { :force => true }
            )
        end

        content_type :json
        { message: "File(s) uploaded: #{files.length}" }.to_json
      end

      post '/admin/file/delete' do
        redirect_if_not_logged_in
        file = Cabi.file( params[:id] )
        FileUtils.rm_rf(file) if File.exists?(file)

        content_type :json
        { message: "Deleted: #{Cabi.file( params[:id] )}" }.to_json
      end

      post '/admin/file/create' do
        redirect_if_not_logged_in
        path  = params[:path]
        id    = Cabi.path_to_id(path)
        
        content_type :json
        if !Cabi.file( id )
          Cabi.create(id) 
          { message: "File created: #{path}" }.to_json
        else
          { message: "File exists." }.to_json
        end
      end      

      post '/admin/file/move' do
        redirect_if_not_logged_in
        id      = params[:id]
        moveto  = params[:moveto]

        if Cabi.file( id )
          path          = Cabi.file( id )
          moveto_path   = File.join(Cabi.data_dir, moveto)
          FileUtils.mv(path, moveto_path) unless File.exists?(moveto_path)

          content_type :json
          { message: "ok" }.to_json
        end
      end  

      get '/admin/file/tree' do
        redirect_if_not_logged_in
        admin_partial "_tree.haml"
      end  

      get %r{/admin/.} do
        file = request.path_info.gsub('/admin', '')
        
        if File.extname(file) == '.scss'
          scss  = Poly::Lib::SassFile.new(file, { base_path: ADMIN_ASSETS_PATH, cache_to: '/admin'})
          css   = scss.get_css
          raise Sinatra::NotFound unless css
          send_file( css )
        elsif File.exists?( File.join(ADMIN_ASSETS_PATH, file) )
          send_file(  File.join(ADMIN_ASSETS_PATH, file) )
        else
          raise Sinatra::NotFound 
        end
      end

      post '/admin/verify' do 
        content_type :json
        Poly::Lib::Persona.verify(params, session, request)
      end

    end
  end
end