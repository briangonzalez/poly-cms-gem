
require 'json'
require './test/test_includes'

class PolyTestDeploy < Test::Unit::TestCase

  include PolyTestIncludes

  GITHUB_PR_HOOK_PAYLOAD = File.read('./test/data/post-receive-hook.json')

  def test_deploy
    commit = Poly::Lib::Commit.new( GITHUB_PR_HOOK_PAYLOAD )
    assert commit.triggers_deploy?
  end

  def test_no_deploy
    data = GITHUB_PR_HOOK_PAYLOAD.gsub "#deploy", "#nope"
    commit = Poly::Lib::Commit.new( data )

    assert !commit.triggers_deploy?, "Should not deploy!"
  end

end