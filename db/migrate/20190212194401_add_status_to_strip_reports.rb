class AddStatusToStripReports < ActiveRecord::Migration[5.1]
  def change
    add_column :strip_reports, :status, :string
  end
end
