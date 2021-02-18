# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all 
user1 = User.create(password: "123456", username: "demolicious@demo.com", first_name: 'Demo', last_name: 'Feature', balance: 10000)
user2 = User.create(password: "123456", username: "tgantulga@ucdavis.edu", first_name: 'Tului', last_name: 'Gantulga', balance: 10000)

UserStock.destroy_all
user1stock1 = UserStock.create(user_id: user1.id, ticker: 'TSLA', amount: 100, unit_price: 800)
user1stock2 = UserStock.create(user_id: user1.id, ticker: 'QYLD', amount: 100, unit_price: 23)
user1stock3 = UserStock.create(user_id: user1.id, ticker: 'OZON', amount: 100, unit_price: 60)
user2stock1 = UserStock.create(user_id: user2.id, ticker: 'TSLA', amount: 100, unit_price: 350)