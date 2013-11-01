
require 'singleton'
require Poly::CORE + '/classes/theme'

module Poly
  module Lib
    class Settings
      include Singleton

      SETTINGS_PATH         = 'settings.yml'
      THEME_SETTINGS_PATH   = [Poly::Lib::Theme::THEMES_PATH, SETTINGS_PATH].join(':') 

      def settings
        Cabi.read(SETTINGS_PATH)
      end

    end
  end
end