class User < ApplicationRecord
  has_many :medication_reports
  has_many :strip_reports
  has_many :symptom_reports
end
