class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :first_name, :last_name, presence: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token
  attr_reader :password

  #SPIRE

  def self.find_by_credentials(username, pw)
    user = User.find_by(username: username)
    user && user.is_password?(pw) ? user : nil 
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def reset_sesssion_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  # private
  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  has_many :stock_history, class_name: :Stock, foreign_key: :user_id

  def current_stocks 
    info = stock_history.group(:ticker).sum(:amount);
    info.keys.map do |key|
      { name: key, amount: info[key]}
    end
  end

end
