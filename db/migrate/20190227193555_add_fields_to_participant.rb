class AddFieldsToParticipant < ActiveRecord::Migration[5.1]
  def change
    remove_column :participants, :name, :string
    remove_column :participants, :treatment_start, :date

    add_column :participants, :name, :string, null: false
    add_column :participants, :treatment_start, :date, null: false
    add_column :participants, :phone_number, :string, null: false
    add_column :participants, :password_digest, :string, null: false
  end
end
