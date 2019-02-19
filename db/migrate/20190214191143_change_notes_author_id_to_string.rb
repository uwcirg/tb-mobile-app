class ChangeNotesAuthorIdToString < ActiveRecord::Migration[5.1]
  def change
    remove_index(
      :notes,
      ["author_type", "author_id"]
    )
    remove_column :notes, :author_id, :bigint, null: false

    add_column :notes, :author_id, :string, null: false
    add_index(
      :notes,
      ["author_type", "author_id"]
    )
  end
end
