
# Require Poly's libs.
Dir[Poly::CORE + "/**/*.rb"].each {|file| require file }

# Require user plugins.
Cabi.file('plugins:**/*.rb').each{ |file| require file }

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

      enable :sessions

      configure do
        set :static,          true
        set :public_folder,   Poly::Lib::Theme.instance.theme_path
        set :show_exceptions, development?
        set :raise_errors,    false
      end

    end
  end
end