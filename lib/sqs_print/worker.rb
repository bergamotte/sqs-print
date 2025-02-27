require 'shoryuken'
require 'cupsffi'
require 'json'

class SqsPrintWorker
  include Shoryuken::Worker

  shoryuken_options queue: 'sqs-print.fifo', auto_delete: true

  def perform(sqs_msg, body)
    puts "Received message: #{body}"
    message = JSON.parse(body)
    file_path = message['file_path']
    printer_name = message['printer_name']
    print_file(file_path, printer_name)
  end

  private

  def print_file(file_path, printer_name)
    CupsPrinter.new(printer_name).print_file(file_path)
  end
end
