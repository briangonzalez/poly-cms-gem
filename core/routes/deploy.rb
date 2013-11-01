
require 'json'

module Poly
  module CMS
    module Deploy
      extend Sinatra::Extension

      post '/deploy/receive' do
        commit = Poly::Lib::Commit.new( params[:payload], request.ip )
        commit.deploy_if_necessary
      end

    end
  end
end