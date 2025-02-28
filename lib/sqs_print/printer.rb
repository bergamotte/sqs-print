require 'cupsffi'
require 'open3'

module SqsPrint
  class Printer
    def print_from_capture(title, subtitle, printer_name, rendering_url)
      file_path = capture_image(title, subtitle, rendering_url)
      print_file(file_path, printer_name)
    end
  
    def print_file(file_path, printer_name)
      CupsPrinter.new(printer_name).print_file(file_path)
    end
  
    private
  
    def capture_image(title, subtitle, rendering_url)
      url = "#{rendering_url}?#{title}?#{subtitle}"
      script_path = File.join(File.dirname(__FILE__), '../../screen_capture.js')
      stdout, stderr, status = Open3.capture3("node #{script_path} #{url}")
      if status.success?
        file_path = stdout.split("\n").last
        puts "Captured image: #{file_path}"
        return file_path
      else
        raise "Error capturing image: #{stderr}"
      end
    end
  end
end
