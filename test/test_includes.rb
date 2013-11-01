
require 'test/unit'
require 'rack/test'

module PolyTestIncludes
  require 'fileutils'
  require File.expand_path File.join('core', 'app')
  include Rack::Test::Methods

  ROOT              = File.expand_path('../..', __FILE__)
  SAMPLE_DATA_PATH  = File.expand_path './my-site'
  BIN_PATH          = File.expand_path './bin/owl'

  def app
    Poly::CMS::App
  end

  def setup
    teardown
    FileUtils.mkdir_p SAMPLE_DATA_PATH
    Dir.chdir SAMPLE_DATA_PATH
    system "#{BIN_PATH} init"
  end

  def teardown
    Dir.chdir ROOT
    FileUtils.rm_rf SAMPLE_DATA_PATH
  end

  def page(path='/home')
    page   = Poly::Lib::Page.new(path, current_scope)
  end

  def setup_page(path='/home')
    @page   = page
    @path   = @page.path
  end

  def current_scope
    Poly::CMS::App.new.helpers
  end

end
