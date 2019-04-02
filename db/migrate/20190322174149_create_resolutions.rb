class CreateResolutions < ActiveRecord::Migration[5.1]
  def change
    # A resolution is a "reported event",
    # authored by coordinators.
    create_table :resolutions, id: false do |t|
      t.string :uuid, primary_key: true, unique: true, null: false, index: true
      t.string :author_type, null: false
      t.string :author_id, null: false

      t.datetime :timestamp
      t.timestamps
    end

    # These other "reported events"
    # can be associated to only a single resolution.
    add_column :medication_reports, :resolution_uuid, :string, foreign_key: true
    add_column :strip_reports, :resolution_uuid, :string, foreign_key: true
    add_column :symptom_reports, :resolution_uuid, :string, foreign_key: true
  end
end
