
require 'digest/sha1'
require 'date'

module Poly
  module Lib
    class Page

      DEFAULT_PAGE_LAYOUT = "default.haml"
      FRONT_MATTER_RE     = /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
      REDCARPET_MD_ENGINE = Redcarpet::Markdown.new( Redcarpet::Render::HTML, {
                                    autolink: true, 
                                    space_after_headers: true,
                                    fenced_code_blocks: true,
                                    underline: true,
                                    highlight: true
                                  }) 

      attr_accessor :raw
      attr_accessor :else
      attr_accessor :html
      attr_accessor :front_matter
      attr_accessor :path

      def initialize(path, current_scope=self, quiet=false)
        read(path)       
        @path = path

        if (!@raw and !quiet)
          @html = false
          return
        end

        @scope = current_scope
        @scope.instance_variable_set :@page, self
        parse_front_matter 
        parse_else
        render
      end

      def read(path)
        @raw  ||= Cabi.read( Poly::Lib::Path.path(path) ) || Cabi.read( Poly::Lib::Path.page_path(path) ) || false
      end

      def parse_else
        @else ||= raw.gsub FRONT_MATTER_RE, ''
      end

      def parse_front_matter
        @front_matter ||= begin
          raise unless raw.index(FRONT_MATTER_RE)
          YAML.load(@raw) || Hash.new
        rescue Exception => e
          Hash.new
        end
      end

      def render
        @html = Haml::Engine.new( layout ).render( @scope, front_matter ) do
                  content
                end
      end

      def content
        # This is the page without the content.
        @content ||= 
          if html?
            @else
          elsif markdown?
            REDCARPET_MD_ENGINE.render( @else )
          else
            Haml::Engine.new( @else ).render( @scope, front_matter )
          end
      end

      def setting(key)
        @front_matter[key]
      end

      def haml_opts
        opts           = front_matter
        opts[:layout]  = layout 
        opts
      end

      def layout 
        user_layout = setting('layout')
        Poly::Lib::Theme.instance.layout( user_layout )
      end

      def type
        post? ? 'post' : home? ? 'home' : 'page' 
      end

      def page?
        !post?
      end

      def post?
        path.index("/post") == 0
      end

      def home?
        path.index("/home") == 0
      end

      def cache?
        if @front_matter.has_key?('cache')
          setting('cache')
        else
          true
        end
      end

      def publish?
        setting('publish')
      end

      def age
        begin
          Date.parse(date).to_time.to_i
        rescue Exception => e
          0
        end
      end

      def sha1
        Digest::SHA1.hexdigest @raw 
      end

      def self.all_posts(current_scope=self, opts)
        files = Cabi.file( Poly::Lib::Path.all_posts_path )

        posts = []
        files.each do |path|
          path        = '/' + path.gsub(Cabi::data_dir, '')[1..-1].split('/')[1..-2].join('/')
          post        =  Poly::Lib::Page.new( path, current_scope, true)
          posts       << post if post.publish? or opts[:include_unpublished]
        end

        posts.sort! {|a,b| a.age <=> b.age }
        posts.reverse!
        posts
      end

      def extension
        File.extname(file).downcase
      end

      def html?
        extension == '.html'
      end

      def markdown?
        extension == '.md'
      end

      def haml?
        extension == '.haml'
      end

      def file
        @file ||= Cabi.file( Poly::Lib::Path.path(@path) ) || Cabi.file( Poly::Lib::Path.page_path(@path) )
      end

    end
  end
end