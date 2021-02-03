class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :company, null: false
      t.timestamps
    end
    add_index :stocks, :ticker
  end
end
