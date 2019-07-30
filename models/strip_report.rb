class StripReport < ApplicationRecord
  belongs_to :participant
  belongs_to :resolution, optional: true
  self.ignored_columns = %w(photo)
end
