class CreateSymptomReports < ActiveRecord::Migration[5.1]
  def change
    create_table :symptom_reports do |t|
      t.string :user_id, null: false

      t.datetime :timestamp
      t.boolean :nausea
      t.boolean :redness
      t.boolean :hives
      t.boolean :fever
      t.boolean :appetite_loss
      t.boolean :blurred_vision
      t.boolean :sore_belly
      t.boolean :yellow_coloration
      t.boolean :difficulty_breathing
      t.boolean :facial_swelling
      t.text :other

      t.timestamps
    end

    add_foreign_key :symptom_reports, :users, column: :user_id, primary_key: "uuid"
  end
end
