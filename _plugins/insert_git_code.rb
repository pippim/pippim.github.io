# Dynamically insert code block from URL
# From: https://blog.bryanroessler.com/2020-03-18-insert-code-blocks-from-repository/

require 'open-uri'

module Jekyll
    class InsertGitCode < Liquid::Tag

        def initialize(tag_name, url, tokens)
            super
            url = url.strip()
            @filename = File.basename(url)
            encoded_url = URI.encode(url)
            @file = URI.parse(encoded_url).read
        end

        def render(_context)
            @file
        end

    end
end

Liquid::Template.register_tag('insert_git_code', Jekyll::InsertGitCode)
