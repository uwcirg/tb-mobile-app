class RenameUsersToParticipants < ActiveRecord::Migration[5.1]
  def change
    rename_table :users, :participants
    rename_column :medication_reports, :user_id, :participant_id
    rename_column :strip_reports, :user_id, :participant_id
    rename_column :symptom_reports, :user_id, :participant_id
  end
end
