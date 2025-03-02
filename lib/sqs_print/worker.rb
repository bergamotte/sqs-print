require 'shoryuken'
require 'json'
require_relative 'printer'

module SqsPrint
  class Worker
    include Shoryuken::Worker
  
    shoryuken_options queue: 'sqs-print', auto_delete: true
  
    def perform(sqs_msg, body)
      puts "Received message: #{body}"
      message = JSON.parse(body)
      printer = Printer.new
      printer.print_from_capture(message['title'], message['subtitle'], message['printer_name'], message['url'] || 'https://wcs.bergamotte.com/packager/sticker_printer')
    end
  end
end
