class AddUrlToStripReport < ActiveRecord::Migration[5.1]
  def change
    add_column :strip_reports, :url_photo, :string
  end
end
