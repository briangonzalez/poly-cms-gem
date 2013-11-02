
require 'digest/md5'

module Poly
  module CMS
    module Helpers
      include Sinatra

      module Render

        def render_page(path)
          # Grab the page & render it.
          page = Poly::Lib::Page.new(path, self)
          if page.html
            page.html
          else 
            raise Sinatra::NotFound
          end
        end

        def partial(path, locals={})
          partial = Poly::Lib::Partial.new(path)
          haml(partial.raw, {}, locals)
        end

      end

    end
  end
end