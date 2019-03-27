class CreateResolutions < ActiveRecord::Migration[5.1]
  def change
    create_table :resolutions do |t|
      t.string :coordinator_id, null: false
      t.string :participant_id, null: false
      t.index :coordinator_id
      t.index :participant_id

      t.datetime :timestamp
      t.belongs_to :medication_report, foreign_key: true
      t.belongs_to :strip_report, foreign_key: true
      t.belongs_to :symptom_report, foreign_key: true

      t.timestamps
    end
  end
end
