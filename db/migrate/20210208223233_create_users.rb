class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :username, null:false 
      t.string :password_digest, null:false 
      t.string :session_token, null:false 
      t.float :balance, null:false
      t.timestamps
    end
    add_index :users, [:username, :session_token], unique: true
  end
end
