
module Poly
  module CMS
    module Helpers
      include Sinatra

      module Truncate

        def truncate(content, length=250)
          HTML_Truncator.truncate(content, length)
        end

      end

    end
  end
end