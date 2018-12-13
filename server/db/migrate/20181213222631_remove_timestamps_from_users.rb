class RemoveTimestampsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :timestamps, :string
  end
end
