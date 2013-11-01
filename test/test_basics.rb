
require './test/test_includes'

class PolyTestMain < Test::Unit::TestCase

  include PolyTestIncludes

  def test_home
    setup_page

    get '/'
    assert last_response.ok?
  end

  def test_settings
    settings = YAML.load(File.read( Poly::Lib::Settings::SETTINGS_PATH )) 
    assert_equal  settings['name'],     Poly::Lib::Settings.instance.settings['name']
    assert_equal  settings['theme'],    Poly::Lib::Settings.instance.settings['theme']
  end

  def test_pages_and_posts
    get '/about'
    assert last_response.ok?
    # r = last_response.body

    get '/page/about'
    assert last_response.ok?
  end

  def test_not_found
    get '/this-will-never-be-found'
    assert_equal 404, last_response.status
  end

  def test_bad_directory_structure

    begin
      Dir.chdir ROOT
      FileUtils.rm_rf SAMPLE_DATA_PATH + "/data"
      Poly::Lib::Checker.check!      
    rescue Exception => e
      # an error **should** happen.
      error = true
    end

    assert_not_nil error

  end

end