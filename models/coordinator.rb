class Coordinator < ApplicationRecord
  # TODO make all of these polymorphic,
  # with `as: :author` linking the creator.
  has_many :notes, as: :author, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
