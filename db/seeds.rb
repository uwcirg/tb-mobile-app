# This file should create all of the records needed
# to seed the database with its default values.
# The data can then be loaded
# with the rails db:seed command
# (or created alongside the database with db:setup).

User.destroy_all

User.create!(
  uuid: "abc123",
  name: "Test User",
  treatment_start: Time.current,
)
