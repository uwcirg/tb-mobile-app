require "administrate/base_dashboard"

class SymptomReportDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    id: Field::Number,
    timestamp: Field::DateTime,
    nausea: Field::Boolean,
    redness: Field::Boolean,
    hives: Field::Boolean,
    fever: Field::Boolean,
    appetite_loss: Field::Boolean,
    blurred_vision: Field::Boolean,
    sore_belly: Field::Boolean,
    yellow_coloration: Field::Boolean,
    difficulty_breathing: Field::Boolean,
    facial_swelling: Field::Boolean,
    other: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :user,
    :id,
    :timestamp,
    :nausea,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :user,
    :id,
    :timestamp,
    :nausea,
    :redness,
    :hives,
    :fever,
    :appetite_loss,
    :blurred_vision,
    :sore_belly,
    :yellow_coloration,
    :difficulty_breathing,
    :facial_swelling,
    :other,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :user,
    :timestamp,
    :nausea,
    :redness,
    :hives,
    :fever,
    :appetite_loss,
    :blurred_vision,
    :sore_belly,
    :yellow_coloration,
    :difficulty_breathing,
    :facial_swelling,
    :other,
  ].freeze

  # Overwrite this method to customize how symptom reports are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(symptom_report)
  #   "SymptomReport ##{symptom_report.id}"
  # end
end
