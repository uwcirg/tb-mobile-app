class Resolution < ApplicationRecord
  belongs_to :author, polymorphic: true

  has_many :medication_reports, foreign_key: :resolution_uuid
  has_many :strip_reports, foreign_key: :resolution_uuid
  has_many :symptom_reports, foreign_key: :resolution_uuid
end
