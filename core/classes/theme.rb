
require 'singleton'

module Poly

  module Lib
    class Theme
      include Singleton

      THEMES_PATH             = 'themes'
      LAYOUTS_PATH            = 'layouts'
      PARTIALS_PATH           = 'partials'
      ASSETS_PATH             = 'assets'
      DEFAULT_THEME           = 'base'
      DEFAULT_PAGE_LAYOUT     = 'default'

      def current
        Poly::Lib::Settings.instance.settings['theme'] || DEFAULT_THEME
      end

      def layout(layout)
        layout = DEFAULT_PAGE_LAYOUT if layout.nil?
        return "=yield" if layout == false

        # this allows one to simply puts "layout: true"
        layout = layout.to_s 

        id_for_default = Cabi.path_to_id( File.join( path, LAYOUTS_PATH, layout ) )
        id_for_page    = Cabi.path_to_id( File.join( path, LAYOUTS_PATH, DEFAULT_PAGE_LAYOUT ) )

        Cabi.read( id_for_default ) || Cabi.read( id_for_page ) || "= yield"
      end

      def file_path
        Cabi.file(path) 
      end

      def path
        File.join( THEMES_PATH, current )
      end

      def theme_path
        id = Cabi.path_to_id( File.join(path, ASSETS_PATH) )
        Cabi.file(id) 
      end

      def settings
        id = Cabi.path_to_id( File.join(path, Poly::Lib::Settings::SETTINGS_PATH) )
        Cabi.read(id)
      end

    end
  end

end