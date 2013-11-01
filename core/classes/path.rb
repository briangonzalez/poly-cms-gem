module Poly
  module Lib
    class Path

      DATA_PATH           = 'data'
      INDEX_PATH          = 'index'
      NOT_FOUND_PATH      = 'not-found'
      POST_PATH           = "post"
      PAGE_PATH           = "page"

      def self.path(p)
        Cabi.path_to_id("#{DATA_PATH}#{p}/#{INDEX_PATH}")
      end

      def self.page_path(p)
        Cabi.path_to_id("#{DATA_PATH}/#{PAGE_PATH}#{p}/#{INDEX_PATH}")
      end

      def self.partial_cabi_id(p)
        p = [Poly::Lib::Theme.instance.path, Poly::Lib::Theme::PARTIALS_PATH, "_" + p].join('/')
        Cabi.path_to_id(p)
      end

      def self.all_posts_path
        [DATA_PATH, POST_PATH, "**/#{INDEX_PATH}.*"].join(':')
      end

    end
  end
end