class UserStock < ApplicationRecord
  validates :user_id, :stock_id, :amount, presence: true

  belongs_to :user, 
    class_name: :User, 
    foreign_key: :user_id

  belongs_to :stock, 
    class_name: :Stock, 
    foreign_key: :stock_id

end
