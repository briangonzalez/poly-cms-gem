
require 'rest-client'
require 'json'

module Poly
  module Lib
    module Persona

      PERSONA_VERIFY_URL = "https://verifier.login.persona.org/verify"

      def self.verify(params, session, request)
        post_params = {
          :assertion => params["assertion"],
          :audience  => params["audience"]
        }

        # Always do a simple verify if development.
        if Sinatra::Application.development?
          return { status: "No user verification needed in development." }.to_json
        end 

        if self.logged_in?(session)
          return { status: "Already verified and logged in." }.to_json
        end

        resp = RestClient::Resource.new( PERSONA_VERIFY_URL,
                                        :verify_ssl => true
                                       ).post(post_params)
        data = JSON.parse(resp)

        if data["status"].eql?("okay")
          return { status: "Not authorized." }.to_json unless self.authorized?(data["email"])

          session[:auth_email] = data["email"]
          puts "** Verified #{session[:auth_email]}"
          data.to_json
        else
          puts "** Error verifying user: #{data.inspect}"
          return { state: "error", data: data, audience: params["audience"] }.to_json
        end

      end

      def self.logged_in?(session)
        return true if Sinatra::Application.development?
        session[:auth_email] && !session[:auth_email].empty?
      end

      def self.authorized?(email)
        Poly::Lib::Settings.instance.settings['authorized_emails'].include?(email)
      end

    end
  end
end