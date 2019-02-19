# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190214191143) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "medication_reports", force: :cascade do |t|
    t.string "user_id", null: false
    t.datetime "timestamp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "author_type", null: false
    t.text "title"
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "author_id", null: false
    t.index ["author_type", "author_id"], name: "index_notes_on_author_type_and_author_id"
  end

  create_table "strip_reports", force: :cascade do |t|
    t.string "user_id", null: false
    t.datetime "timestamp", null: false
    t.string "photo_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
  end

  create_table "symptom_reports", force: :cascade do |t|
    t.string "user_id", null: false
    t.datetime "timestamp"
    t.boolean "nausea"
    t.boolean "redness"
    t.boolean "hives"
    t.boolean "fever"
    t.boolean "appetite_loss"
    t.boolean "blurred_vision"
    t.boolean "sore_belly"
    t.boolean "yellow_coloration"
    t.boolean "difficulty_breathing"
    t.boolean "facial_swelling"
    t.text "other"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", primary_key: "uuid", id: :string, force: :cascade do |t|
    t.string "name"
    t.date "treatment_start"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uuid"], name: "index_users_on_uuid"
  end

  add_foreign_key "medication_reports", "users", primary_key: "uuid"
  add_foreign_key "strip_reports", "users", primary_key: "uuid"
  add_foreign_key "symptom_reports", "users", primary_key: "uuid"
end
