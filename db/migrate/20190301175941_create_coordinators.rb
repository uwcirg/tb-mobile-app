class CreateCoordinators < ActiveRecord::Migration[5.1]
  def change
    create_table :coordinators, id: false do |t|
      t.string :uuid, primary_key: true, unique: true, null: false, index: true
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps
    end
  end
end
