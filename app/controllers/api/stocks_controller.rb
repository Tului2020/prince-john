class Api::StocksController < ApplicationController
  def index
    @user = User.find_by(id: params[:user_id])
  end

  def create
    @stock = Stock.new(stock_params)
    @stock.user_id = params[:user_id]
    if !@stock.save 
      render json: @stock.errors.full_messages, status: 401
    end
  end


  private 
  def stock_params
    params.require(:stock).permit(:amount, :unit_price, :ticker)
  end
end
