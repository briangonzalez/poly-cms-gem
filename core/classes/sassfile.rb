
require 'singleton'
require 'fileutils'

module Poly
  module Lib
    class SassFile

      attr_accessor :scss, :css

      def initialize(path, opts={})
        @path       = path
        @base_path  = opts[:base_path] || Poly::Lib::Theme.instance.theme_path
        @cache_to   = opts[:cache_to]  || ''

        @css_file   = File.basename(path, '.scss') + '.css'
        @css        = File.expand_path("#{Poly::CMS::Cache::CACHE_STORE}#{@cache_to}/#{@css_file}")
        @scss       = @base_path + "/scss" + path
      end
   
      def get_css
        if File.exists?(@scss)
          if cached_css and Sinatra::Base.production?
            Poly::Lib::CheapQueue.instance.add_task( @path, compilation_task )
          else
            compilation_task.call
          end
          return cached_css
        end
      end

      def compilation_task
        Proc.new{|i| 
          begin
            Compass.configuration do |config|
              config.sass_path      = @base_path + "/scss"
              config.css_path       = @base_path + "/css"
              config.output_style   = Sinatra::Base.production? ? :compressed : :nested
              config.sass_options   = { quiet: true }
            end

            base_dir = File.dirname(@css)
            FileUtils.mkdir_p( base_dir ) unless File.exists?(base_dir)
            Compass.compiler.compile_if_required( @scss, @css )
          rescue Exception => e
            `say 'Error compiling Sass file.'`
            puts "Error: " + e.message         
          end
        }
      end

      def cached_css
        @cached_css ||= Poly::Lib::CachedFile.find( @cache_to + "/" + @css_file )
      end

    end
  end
end

module Poly
  module Lib
    class CheapQueue
      include Singleton
      SLEEP_INTERVAL = 0.1

      def initialize
        @task_list = []
        @tasks    = {}
        loop
      end

      def add_task(name, task)
        @task_list  << name unless @tasks[name]
        @tasks[name] = task
      end

      def size
        @task_list.size
      end

      def loop
        Thread.new do 
          while true do
            sleep SLEEP_INTERVAL
            next if @task_list.empty?
            reversed_task_list   = @task_list.reverse
            task_name            = reversed_task_list.pop
            @tasks.delete(task_name).call if @tasks[task_name]
          end
        end
      end

    end
  end
end
