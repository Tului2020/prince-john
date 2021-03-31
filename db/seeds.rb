# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all 
user1 = User.create(password: "123456", username: "demolicious@demo.com", first_name: 'Demo', last_name: 'Feature', balance: 10000)

Stock.destroy_all
# user1stock1 = Stock.create(user_id: user1.id, ticker: 'QYLD', amount: 100, unit_price: 23)
user1stock2 = Stock.create(user_id: user1.id, ticker: 'TSLA', amount: 100, unit_price: 350)

History.destroy_all
tsla_history = History.create(ticker: 'TSLA', date: 'Mon Mar 29 2021 18:30:00 GMT-0700 (Pacific Daylight Time)', history: '601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,601.085,600.675,601.695,602.695,602.91,601.78,601.315,601.525,604.655,607.88,606.955,605.035,604.035,603.185,602.485,603.165,603.77,603.705,604.73,605.125,606.25,608.505,611.025,611.76,612.51,613.34,612.425,610.93,609.985,609.955,609.015,607.735,607.22,606.935,607.5,607.795,607.94,608.215,608.99,609.68,608.235,606.42,606.35,607.625,608.905,608.59,609.25,610.43,611.25,611.815,611.66,611.505,610.515,611.495,611.04,609.605,609.77,610.55,611.185,610.795,611.08,610.795,610.87,610.33,609.725,609.5,609.89,610.065,610.19,610.015,609.725,609.56,609.625,610.075,609.525,609.04,609.095,609.12,608.925,608.825,608.525,608.79,608.985,609.155,608.755,608.8,608.8,608.8')
