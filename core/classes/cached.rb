
require 'fileutils'

module Poly
  module Lib
    class CachedFile

      def self.find(path)

        file_to_return = false
        self.possible_paths(path).each do |file|
          file_to_return = file if File.exists?(file)
          break if file_to_return
        end

        file_to_return
      end

      def self.possible_paths(path, extension='.html')
        extension = File.extname(path).empty? ? extension : ''
        [
          File.expand_path("#{Poly::CMS::Cache::CACHE_STORE}#{path}#{extension}" ),
          File.expand_path("#{Poly::CMS::Cache::CACHE_STORE}#{path}/index#{extension}" ),
          File.expand_path("#{Poly::CMS::Cache::CACHE_STORE}#{path}index#{extension}" )
        ]
      end

      def self.clear_all!
        puts "** Removing Poly cache **"
        FileUtils.rm_rf Poly::CMS::Cache::CACHE_STORE
      end

    end
  end
end