class Participant < ApplicationRecord
  has_many :medication_reports, dependent: :destroy
  has_many :strip_reports, dependent: :destroy
  has_many :symptom_reports, dependent: :destroy
  has_many :notes, as: :author, dependent: :destroy

  validates :name, presence: true
  validates :phone_number, presence: true, uniqueness: true
  validates :treatment_start, presence: true
  validates :password_digest, presence: true

  def as_json(*args)
    {
      uuid: uuid,
      name: name,
      phone_number: phone_number,
      treatment_start: treatment_start,

      medication_reports: medication_reports,
      strip_reports: strip_reports,
      symptom_reports: symptom_reports,
      notes: notes,
      adherence: adherence,
    }
  end

  def summary
    {
      uuid: uuid,
      name: name,
      phone_number: phone_number,
      treatment_start: treatment_start,

      medication_reports: medication_reports.where(resolution_uuid: nil),
      strip_reports: strip_reports.where(resolution_uuid: nil),
      symptom_reports: symptom_reports.where(resolution_uuid: nil),

      notes: notes,
      adherence: adherence,
    }
  end

  def adherence
    days = (Time.current.to_date - treatment_start).to_i

    if days == 0
      days = 1
    end

    report_dates = medication_reports.map do |report|
      report.timestamp.to_date
    end.uniq.count

    report_dates.to_f / days.to_f
  end
end
