require "capybara/rspec"

SELENIUM_HOST = ENV.fetch("SELENIUM_HOST")
TEST_APP_HOST = ENV.fetch("TEST_APP_HOST")
TEST_APP_PORT = ENV.fetch("TEST_APP_PORT")

# The `.rspec` file contains `--require spec_helper`,
# which will cause this file to always be loaded,
# without a need to explicitly require it in any files.

# Given that it is always loaded,
# it is important to keep this file as light-weight as possible.

# Requiring heavyweight dependencies from this file
# will add to the boot time of your test suite on EVERY test run,
# even for an individual file that may not need all of that loaded.
# Instead, consider making a separate helper file
# that requires the additional dependencies and performs the additional setup,
# and require it from the spec files that actually need it.

# See http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration

RSpec.configure do |config|
  # rspec-expectations config goes here. You can use an alternate
  # assertion/expectation library such as wrong or the stdlib/minitest
  # assertions if you prefer.
  config.expect_with :rspec do |expectations|
    # This option will default to `true` in RSpec 4. It makes the `description`
    # and `failure_message` of custom matchers include text for helper methods
    # defined using `chain`, e.g.:
    #     be_bigger_than(2).and_smaller_than(4).description
    #     # => "be bigger than 2 and smaller than 4"
    # ...rather than:
    #     # => "be bigger than 2"
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  # rspec-mocks config goes here. You can use an alternate test double
  # library (such as bogus or mocha) by changing the `mock_with` option here.
  config.mock_with :rspec do |mocks|
    # Prevents you from mocking or stubbing a method that does not exist on
    # a real object. This is generally recommended, and will default to
    # `true` in RSpec 4.
    mocks.verify_partial_doubles = true
  end

  # This option will default to `:apply_to_host_groups` in RSpec 4 (and will
  # have no way to turn it off -- the option exists only for backwards
  # compatibility in RSpec 3). It causes shared context metadata to be
  # inherited by the metadata hash of host groups and examples, rather than
  # triggering implicit auto-inclusion in groups with matching metadata.
  config.shared_context_metadata_behavior = :apply_to_host_groups

  Capybara.register_driver :selenium_remote do |app|
    Capybara::Selenium::Driver.new(
      app,
      url:  "http://#{SELENIUM_HOST}:4444/wd/hub",
      browser: :remote,
      desired_capabilities: :firefox
    )
  end
  Capybara.default_driver = :selenium_remote

  Capybara.server_port = TEST_APP_PORT
  Capybara.server_host = TEST_APP_HOST
  Capybara.app_host = "http://#{TEST_APP_HOST}:#{TEST_APP_PORT}"

  config.include Capybara::DSL

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = :random

  # Seed global randomization in this process using the `--seed` CLI option.
  # Setting this allows you to use `--seed` to deterministically reproduce
  # test failures related to randomization by passing the same `--seed` value
  # as the one that triggered the failure.
  Kernel.srand config.seed
end
