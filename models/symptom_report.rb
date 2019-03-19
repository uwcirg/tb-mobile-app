class SymptomReport < ApplicationRecord
  belongs_to :participant

  def as_json(*args)
    {
      created_at: created_at,
      reported_symptoms: reported_symptoms,
      nausea_rating: nausea_rating,
      timestamp: timestamp,
      other: other,
    }
  end

  def reported_symptoms
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
      nausea
    ].select { |symptom| self.send(symptom) }
  end
end
