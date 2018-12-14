class Note < ApplicationRecord
  belongs_to :author, polymorphic: true
end
