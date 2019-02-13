class CreateMedicationReports < ActiveRecord::Migration[5.1]
  def change
    create_table :medication_reports do |t|
      t.string :user_id, null: false
      t.datetime :timestamp, null: false

      t.timestamps
    end

    add_foreign_key :medication_reports, :users, column: :user_id, primary_key: "uuid"
  end
end
