json.extract! user, :id, :username, :last_name, :first_name, :balance, :stock_history, :current_stocks

# json.current_stocks do
#     user.current_stocks.each do |stock|
#         json.extract! stock, :name
#     end
# end