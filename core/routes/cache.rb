
module Poly

  module CMS
    module Cache  
      extend Sinatra::Extension

      CACHE_ROOT        = "#{Dir.pwd}"
      CACHE_PATH        = ".poly-cache"
      CACHE_STORE       = File.expand_path File.join(CACHE_ROOT, CACHE_PATH)
      METASTORE_URI     = "file:#{CACHE_STORE}"
      ENTITYSTORE_URI   = "file:#{CACHE_STORE}"

      CACHE_BLACKLIST   = [ /^\/cache/, /^\/admin/, /\*.scss/ ]

      configure :production do 
        use Rack::Cache,
          verbose:     false,
          metastore:   METASTORE_URI,
          entitystore: ENTITYSTORE_URI

        use Rack::FunkyCache, 
          root: CACHE_ROOT, 
          path: CACHE_PATH
      end

      before do
        if Sinatra::Base.production?
        
          file = Poly::Lib::CachedFile.find(request.path_info)
          
          if file
            if (env['HTTP_PRAGMA'] == 'no-cache') or request.path.match Regexp.new(CACHE_BLACKLIST.join("|"))
              # don't send cached file.
            else
              last_modified File.mtime(file)
              send_file(file)
            end
          end
          
        end
      end

      get '/cache/clear' do
        return "No need to clear cache in development." if Sinatra::Base.development?
        Poly::Lib::CachedFile.clear_all!
        "You have cleared the cache."
      end

    end
  end
end