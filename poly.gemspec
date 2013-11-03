
require 'bundler'

Gem::Specification.new do |gem|
  gem.name                  = 'poly-cms'
  gem.version               = '0.1.3'
  gem.summary               = 'A simple way to manage your content.'
          
  gem.description           = <<-EOS
Poly is a Ruby CMS with smart asset compiling and much, much more.
  EOS


  gem.authors               = ["Brian Gonzalez"]
  gem.email                 = 'me@briangonzalez.org'
  gem.homepage              = 'http://github.com/briangonzalez/poly-gem'
  gem.license               = 'MIT'
          
  gem.files                 = `git ls-files`.split($/)
  gem.executables           << 'poly'

  # CLI
  gem.add_dependency        'thor',                 '~> 0.18'

  # From gemfile.
  Bundler.definition.specs.each{ |r| gem.add_dependency r.name, r.version }

  gem.required_ruby_version = '>= 1.9'
end