class StorePhotosDirectly < ActiveRecord::Migration[5.1]
  def change
    remove_column :strip_reports, :photo_url, :string, null: false
    add_column :strip_reports, :photo, :text, null: false
  end
end
