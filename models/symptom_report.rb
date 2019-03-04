class SymptomReport < ApplicationRecord
  belongs_to :participant

  def as_json(*args)
    {
      created_at: created_at,
      reported_symptoms: reported_symptoms,
    }
  end

  def reported_symptoms
    basic_symptoms + [
      other ? "Other: #{other}" : nil,
      nausea ? "Nausea: #{nausea_rating} / 10" : nil,
    ].compact
  end

  def basic_symptoms
    %w[
      redness
      hives
      fever
      appetite_loss
      blurred_vision
      sore_belly
      yellow_coloration
      difficulty_breathing
      facial_swelling
    ].select { |symptom| self.send(symptom) }
  end
end
