
module Poly
  module CMS
    module Helpers
      include Sinatra

      module Base

        def site_setting(key)
          Poly::Lib::Settings.instance.settings[key]
        end

        def theme_setting(key)
          Poly::Lib::Theme.instance.settings[key]
        end

        def posts(include_unpublished=false)
          Poly::Lib::Page.all_posts(self, { include_unpublished: include_unpublished })
        end

        def data(key)
          path  = File.join(Poly::Lib::Path::DATA_PATH, key)
          id    = Cabi.path_to_id( path )
          data  = Cabi.read( id )
          file  = Cabi.file(id) 

          begin
            (file and File.extname(file) == '.haml') ? haml(data) : data
          rescue Exception => e
            "<code>[Error] #{e}</code>"
          end
        end

        def page_path
          @page.path
        end

        def page_type
          @page.type
        end

      end

    end
  end
end