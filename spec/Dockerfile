FROM ubuntu

RUN apt-get update -qq

# Used to install `ruby-install`
RUN apt-get install -y wget

# Nokogiri dependencies
# See https://www.nokogiri.org/tutorials/installing_nokogiri.html
RUN apt-get install -y build-essential patch ruby-dev zlib1g-dev liblzma-dev

# Ruby prerequisites
WORKDIR /src
RUN wget -O ruby-install-0.7.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.7.0.tar.gz
RUN tar -xzvf ruby-install-0.7.0.tar.gz
WORKDIR /src/ruby-install-0.7.0/
RUN make install

# Install a modern version of Ruby
RUN ruby-install ruby 2.5.3
ENV PATH /opt/rubies/ruby-2.5.3/bin:$PATH

# Install gems
WORKDIR /spec
RUN gem install bundler -v 1.17.1
ADD Gemfile* ./
RUN bundle

# Add spec files
ADD . /spec
ENTRYPOINT ["bundle", "exec"]
CMD rspec
