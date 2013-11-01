
require 'digest/md5'

module Poly
  module CMS
    module Helpers
      include Sinatra

      module Render

        def render_page(path)
          # Grab the page & render it.
          page = Poly::Lib::Page.new(path, self)
          page.html
        end

        def partial(path, locals={})
          partial = Poly::Lib::Partial.new(path)
          haml(partial.raw, {}, locals)
        end

      end

    end
  end
end