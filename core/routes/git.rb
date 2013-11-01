
require 'json'

module Poly
  module CMS
    module Git
      extend Sinatra::Extension

      post '/admin/git' do
        redirect_if_not_logged_in

        cmd = (params[:cmd] || '').strip
        cmd = cmd[0..2] == 'git' ? cmd : ['git', cmd].join(' ')

        output = %x[#{cmd}]

        content_type :json
        { message: output }.to_json
      end

    end
  end
end