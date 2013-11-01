
require './test/test_includes'

class PolyTestData < Test::Unit::TestCase

  include PolyTestIncludes

  def test_data
    key = "nav:links"
    assert_equal    Poly::Lib::OtherData.read(key),
                    current_scope.data(key)
  end

end