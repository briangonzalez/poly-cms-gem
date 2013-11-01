module Poly
  module Lib
    class Partial

      attr_accessor :raw

      def initialize(path)
        @raw = Cabi.read( Poly::Lib::Path.partial_cabi_id(path) )
      end

    end
  end
end