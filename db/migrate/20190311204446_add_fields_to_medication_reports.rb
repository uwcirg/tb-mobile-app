class AddFieldsToMedicationReports < ActiveRecord::Migration[5.1]
  def change
    add_column :medication_reports, :took_medication, :boolean
    add_column :medication_reports, :not_taking_medication_reason, :string
  end
end
