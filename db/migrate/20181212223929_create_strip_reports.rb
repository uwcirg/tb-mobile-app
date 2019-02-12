class CreateStripReports < ActiveRecord::Migration[5.1]
  def change
    create_table :strip_reports do |t|
      t.string :user_id, null: false

      t.datetime :timestamp, null: false
      t.string :photo_url, null: false

      t.timestamps
    end

    add_foreign_key :strip_reports, :users, column: :user_id, primary_key: "uuid"
  end
end
