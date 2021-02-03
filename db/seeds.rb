# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
user1 = User.create(username: 'Tului1', password:'password', email:'tului1@gmail.com')
user2 = User.create(username: 'Tului2', password:'password', email:'tului2@gmail.com')
# user3 = User.create(username: 'Tului3', password:'password', email:'tului3@gmail.com')
# user4 = User.create(username: 'Tului4', password:'password', email:'tului4@gmail.com')


Stock.destroy_all
stock1 = Stock.create(ticker: "QYLD", description: "ETF SP500")
stock2 = Stock.create(ticker: "UAL", description: "United Airlines")
stock3 = Stock.create(ticker: "TSLA", description: "Tesla")
stock4 = Stock.create(ticker: "TWTR", description: "Twitter")


UserStock.destroy_all
user_stock11 = UserStock.create(user_id: user1.id, stock_id: stock1.id, amount: 11)
user_stock12 = UserStock.create(user_id: user1.id, stock_id: stock2.id, amount: 12)
user_stock13 = UserStock.create(user_id: user1.id, stock_id: stock3.id, amount: 13)
user_stock14 = UserStock.create(user_id: user1.id, stock_id: stock4.id, amount: 14)
user_stock21 = UserStock.create(user_id: user2.id, stock_id: stock1.id, amount: 21)
user_stock24 = UserStock.create(user_id: user2.id, stock_id: stock4.id, amount: 24)




