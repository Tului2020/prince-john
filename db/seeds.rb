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
user3 = User.create(username: 'Tului3', password:'password', email:'tului3@gmail.com')
user4 = User.create(username: 'Tului4', password:'password', email:'tului4@gmail.com')


