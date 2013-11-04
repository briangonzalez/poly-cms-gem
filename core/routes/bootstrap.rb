
# Require Poly's libs.
Dir[Poly::CORE + "/**/*.rb"].each {|file| require file }

# Define a dumbed-down Bootstrap module.
module Poly
  module CMS
    module Bootstrap
      extend Sinatra::Extension

      def self.register_module(mod)
        register(mod)
      end

    end
  end
end

# Then load in plugins.
Cabi.file('plugins:**/*.rb').each{ |file| require file }

# Then load in the larger version of the bootstrap.
module Poly
  module CMS
    module Bootstrap
      extend Sinatra::Extension

      register  Poly::CMS::Admin
      register  Poly::CMS::AssetCompiler
      register  Poly::CMS::Cache
      register  Poly::CMS::Deploy
      register  Poly::CMS::Git
      register  Poly::CMS::Base

      helpers   Poly::CMS::Helpers::Base
      helpers   Poly::CMS::Helpers::Render
      helpers   Poly::CMS::Helpers::Truncate

      use Rack::Session::File

      configure do
        set :static,          true
        set :public_folder,   Poly::Lib::Theme.instance.theme_path
        set :show_exceptions, development?
        set :raise_errors,    false
      end

    end
  end
end