module Poly
  module Lib
    class Commit

      DEPLOY_TRIGGER  = '#deploy'
      GITHUB_IP_1     = NetAddr::CIDR.create('204.232.175.64/27').enumerate
      GITHUB_IP_2     = NetAddr::CIDR.create('192.30.252.0/22').enumerate
      BITBUCKET_IPS   = ['207.223.240.187', '207.223.240.188']
      AUTHORIZED_IPS  = BITBUCKET_IPS + GITHUB_IP_1 + GITHUB_IP_2

      attr_accessor :data
      attr_accessor :message
      attr_accessor :id
      attr_accessor :ip

      def initialize(payload, ip)
        if Sinatra::Base.production?
          @payload  = payload.is_a?(String) ? JSON.parse(payload) : payload["payload"]
          @data     = @payload["commits"].first
          @ip       = ip
          parse_message
          parse_id
        end
      end

      def parse_message
        @message = @data['message'].downcase
      end

      def parse_id 
              # github #       # bitbucket #
        @id = @data['id']  ||  @data['node']
      end

      def deploy_if_necessary
        if deploy?
          Poly::Lib::CachedFile.clear_all!
          cmd = [
            'git stash',
            'git reset --hard HEAD',
            'git pull',
            'git stash pop'
          ]
          system cmd.join(" && ")
        end
      end

      def triggers_deploy?
        @message.include? DEPLOY_TRIGGER
      end

      def authorized?
        AUTHORIZED_IPS.include?(@ip)
      end

      def deploy?
        (Sinatra::Base.development?) || (triggers_deploy? and authorized?)
      end

    end
  end
end