class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :description, null: false
      t.timestamps
    end
    add_index :stocks, :ticker
  end
end
