class Resolution < ApplicationRecord
  belongs_to :coordinator
  belongs_to :participant
  belongs_to :medication_report
  belongs_to :strip_report
  belongs_to :symptom_report
end
