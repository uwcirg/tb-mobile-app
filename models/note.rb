class Note < ApplicationRecord
  belongs_to :author, polymorphic: true
  validates :title, presence: true
end
