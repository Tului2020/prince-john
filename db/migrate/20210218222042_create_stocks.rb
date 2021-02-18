class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.integer :user_id, null: false
      t.string :ticker, null: false
      t.float :amount, null: false
      t.float :unit_price, null: false
      t.timestamps
    end

    add_index :stocks, :user_id
    add_index :stocks, :ticker
  end
end
