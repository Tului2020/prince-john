class CreateHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :histories do |t|
      t.string :ticker, null: false
      t.string :date, null: false
      t.text :history, null: false
      t.timestamps
    end

    add_index :histories, :ticker, unique: true
  end
end
