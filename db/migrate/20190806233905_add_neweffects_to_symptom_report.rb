class AddNeweffectsToSymptomReport < ActiveRecord::Migration[5.1]
  def change
    add_column :symptom_reports, :headache, :boolean
    add_column :symptom_reports, :dizziness, :boolean
  end
end
