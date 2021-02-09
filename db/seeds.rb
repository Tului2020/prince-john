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


UserStock.destroy_all
user_stock1 = UserStock.create(user_id: user1.id, ticker: 'AAPL', amount: 11, unit_price: 10)
user_stock2 = UserStock.create(user_id: user1.id, ticker: 'TSLA', amount: 12, unit_price: 10)
user_stock3 = UserStock.create(user_id: user1.id, ticker: 'QYLD', amount: 13, unit_price: 10)
user_stock4 = UserStock.create(user_id: user1.id, ticker: 'AZN', amount: 14, unit_price: 10)
user_stock5 = UserStock.create(user_id: user2.id, ticker: 'AAPL', amount: 21, unit_price: 10)
user_stock6 = UserStock.create(user_id: user2.id, ticker: 'OZON', amount: 24, unit_price: 10)




