class Participant < ApplicationRecord
  # TODO make all of these polymorphic,
  # with `as: :author` linking the creator.
  has_many :medication_reports, dependent: :destroy
  has_many :strip_reports, dependent: :destroy
  has_many :symptom_reports, dependent: :destroy
  has_many :notes, as: :author, dependent: :destroy

  validates :name, presence: true
  validates :phone_number, presence: true, uniqueness: true
  validates :treatment_start, presence: true
  validates :password_digest, presence: true
end
