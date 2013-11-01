
require Poly::CORE + '/classes/error'

module Poly

  DEFAULT_THEME_DIR       = 'themes' 
  DEFAULT_DATA_DIR        = 'data'
  REQUIRED_DATA_SUB_DIRS  = ['post', 'page', 'home']

  module Lib
    class Checker

      def self.check!
        unless self.base_dirs? and self.sub_dirs?
          raise Poly::Error.new('Directory structure is not correct! Have you run the `owl new` command?') 
        end
      end

      def self.base_dirs?
        Cabi.file(DEFAULT_DATA_DIR) and
        Cabi.file(DEFAULT_THEME_DIR)
      end

      def self.sub_dirs?
        ok = nil
        REQUIRED_DATA_SUB_DIRS.each do |dir|
          ok = Cabi.file( [DEFAULT_DATA_DIR, dir].join(':') )
          break if not ok
        end
        ok
      end

    end
  end
end

Poly::Lib::Checker.check!