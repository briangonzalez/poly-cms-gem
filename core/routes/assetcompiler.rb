
require 'sass/plugin'

module Poly
  module CMS
    module AssetCompiler
      extend Sinatra::Extension


      get '/*.scss' do
        scss  = Poly::Lib::SassFile.new(request.path_info)
        css   = scss.get_css

        if css
          send_file(css)
        else
          raise Sinatra::NotFound 
        end
      end

    end
  end
end