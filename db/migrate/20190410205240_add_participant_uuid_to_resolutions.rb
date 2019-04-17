class AddParticipantUuidToResolutions < ActiveRecord::Migration[5.1]
  def change
    add_column :resolutions, :participant_uuid, :string
    add_column :resolutions, :status, :string
  end
end
