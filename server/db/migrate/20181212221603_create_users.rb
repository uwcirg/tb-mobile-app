class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users, id: false do |t|
      t.string :uuid, primary_key: true, unique: true, null: false, index: true
      t.string :name
      t.date :treatment_start
      t.string :timestamps

      t.timestamps
    end
  end
end
