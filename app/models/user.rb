class User < ApplicationRecord

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: {minimum:6, allow_nil: true}
  validates :balance, presence: true

  attr_reader :password

  def initialize(*args)
    p *args
    super(*args)
    ensure_session_token
    calculate_balance
  end


  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
  

  has_many :user_stock, 
    class_name: :UserStock, 
    foreign_key: :user_id


  has_many :stocks,
    through: :user_stock,
    source: :stock
    # has_many :objects, class_name: "object", foreign_key: "reference_id"



  def calculate_balance
    self.balance = user_stock.pluck(:amount, :unit_price).inject(0) { |sum, stock| sum + stock[0] * stock[1]}
    self.save!
  end

end
