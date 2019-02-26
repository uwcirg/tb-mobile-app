class Participant < ApplicationRecord
  has_many :medication_reports, dependent: :destroy
  has_many :strip_reports, dependent: :destroy
  has_many :symptom_reports, dependent: :destroy

  has_many :notes, as: :author
end
