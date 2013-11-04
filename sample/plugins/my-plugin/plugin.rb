
# Your plugin goes here.

module Sinatra
  module MyPlugin
    extend Sinatra::Extension

    helpers do
      def random_string
        (0...8).map { (65 + rand(26)).chr }.join
      end
    end

    before do
      # puts "I am a plugin!"
    end

    # All routes defined in plugins will have 
    # precedence over the default routes, 
    # so be careful.

    get '/monkey' do
      'I am a monkey!'
    end

  end
end

# Uncomment the following line to 
# register your plugin.

# Poly::CMS::Bootstrap.register_module(Sinatra::MyPlugin)