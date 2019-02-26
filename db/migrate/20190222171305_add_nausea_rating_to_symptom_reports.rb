class AddNauseaRatingToSymptomReports < ActiveRecord::Migration[5.1]
  def change
    add_column :symptom_reports, :nausea_rating, :integer
  end
end
