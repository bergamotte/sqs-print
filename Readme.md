# Mac SQS Printer

This Ruby library project is designed to:
- Use the `cupsffi` gem to send a file to print.
- Use the `shoryuken` gem to listen to an SQS queue, log the message contents to standard output, and then send the contents to print.

## Setup

1. Install the required gems:
    ```sh
    bundle install
    ```

2. Configure the SQS queue and printer settings in `config.yml`.

## Usage

To start listening to the SQS queue and printing messages, run:
```sh
shoryuken -r ./lib/mac_sqs/worker.rb -C ./config/shoryuken.yml
```

To print a file directly using the `print_file` script, run:
```sh
./bin/print_file <file_path> <printer_name>
```
