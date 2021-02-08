class CreateUserStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_stocks do |t|
      t.integer :user_id, null: false
      t.integer :stock_id, null: false
      t.float :amount, null: false
      t.float :unit_price, null: false
      t.timestamps
    end
    add_index :user_stocks, :user_id
    add_index :user_stocks, :stock_id
  end
end
