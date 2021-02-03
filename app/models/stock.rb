class Stock < ApplicationRecord
  validates :ticker, :description, presence: true, uniqueness: true


  has_many :user_stock, 
    class_name: :UserStock, 
    foreign_key: :stock_id
  
  has_many :owners,
    through: :user_stock,
    source: :user

end
