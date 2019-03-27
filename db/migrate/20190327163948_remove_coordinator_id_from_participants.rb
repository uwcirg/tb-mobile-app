class RemoveCoordinatorIdFromParticipants < ActiveRecord::Migration[5.1]
  def change
    remove_column :participants, :coordinator_id, :string, null: false
  end
end
