
module Poly
  module CMS
    module Base
      extend Sinatra::Extension

      not_found do
        render_page('/not-found')
      end
      
      error do
        render_page('/error')
      end

      get '*' do |path|
        path = "/home" if path == '/'
        render_page(path)
      end

    end
  end
end