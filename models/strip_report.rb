class StripReport < ApplicationRecord
  belongs_to :participant
  belongs_to :resolution, optional: true
end
