class Participant < ApplicationRecord
  belongs_to :coordinator

  has_many :medication_reports, dependent: :destroy
  has_many :strip_reports, dependent: :destroy
  has_many :symptom_reports, dependent: :destroy
  has_many :notes, as: :author, dependent: :destroy

  validates :name, presence: true
  validates :phone_number, presence: true, uniqueness: true
  validates :treatment_start, presence: true
  validates :password_digest, presence: true

  before_validation :assign_random_coordinator

  def assign_random_coordinator
    self.coordinator_id ||= Coordinator.pluck(:uuid).sample
  end

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

      today: {
        medication_reports: medication_reports.where("timestamp >= :date", date: Time.current.beginning_of_day),
        strip_reports: strip_reports.where("timestamp >= :date", date: Time.current.beginning_of_day),
        symptom_reports: symptom_reports.where("created_at >= :date", date: Time.current.beginning_of_day),
        notes: notes.where("created_at >= :date", date: Time.current.beginning_of_day),
      }
    }
  end
end
