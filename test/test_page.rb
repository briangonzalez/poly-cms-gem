
require './test/test_includes'

class PolyTestPage < Test::Unit::TestCase

  include PolyTestIncludes

  def test_page_basics
    setup_page

    assert        @page.publish?

    assert_equal  @page.front_matter['title'],
                  @page.setting('title')

    assert_equal  @page.front_matter['date'],
                  @page.setting('date')
  end

  def test_no_front_matter
    path  = '/no-front-matter' # this page has no front matter
    page  = Poly::Lib::Page.new(path, current_scope)

    assert_equal  Hash.new, page.front_matter
  end

  def test_all_posts
    get "/home"
    assert last_response.ok?

    posts = current_scope.posts
    assert posts.length > 0
  end 

  def test_content
    setup_page
    assert @page.content.length <= @page.html.length
  end

  def test_unpublished_posts
    posts     = current_scope.posts
    all_posts = current_scope.posts(true)   # include unpublished posts

    assert posts.length <= all_posts.length
  end

end