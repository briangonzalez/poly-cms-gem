# encoding: utf-8
require 'rubygems' 
require 'bundler/setup'

# Base requires.
Bundler.require(:default)

module Poly

  ROOT          = File.expand_path '../..', __FILE__
  CORE          = File.join(Poly::ROOT, 'core')
  require         Poly::CORE + '/routes/bootstrap'

  module CMS

    class App < Sinatra::Base
      register Poly::CMS::Bootstrap
    end

  end
end