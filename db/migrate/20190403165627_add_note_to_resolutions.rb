class AddNoteToResolutions < ActiveRecord::Migration[5.1]
  def change
    add_column :resolutions, :note, :string
  end
end
