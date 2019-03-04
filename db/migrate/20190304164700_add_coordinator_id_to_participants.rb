class AddCoordinatorIdToParticipants < ActiveRecord::Migration[5.1]
  def change
    add_column :participants, :coordinator_id, :string, null: false
  end
end
