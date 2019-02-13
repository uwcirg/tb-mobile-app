class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.references :author, polymorphic: true, index: true, null: false
      t.text :title
      t.text :text, null: false

      t.timestamps
    end
  end
end
