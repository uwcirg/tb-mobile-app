class SymptomReport < ApplicationRecord
  belongs_to :participant
  belongs_to :resolution, optional: true

  def as_json(*args)
    {
      id: id,
      created_at: created_at,
      reported_symptoms: reported_symptoms,
      nausea_rating: nausea_rating,
      timestamp: timestamp,
      other: other,
      resolution_uuid: resolution_uuid,
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
