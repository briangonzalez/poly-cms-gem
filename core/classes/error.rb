
module Poly
  class Error < StandardError
    def initialize(msg = "An error has occurred.")
      super( [" ** Poly", msg].join(' - ') )
    end
  end
end

