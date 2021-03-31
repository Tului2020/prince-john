class Api::HistoriesController < ApplicationController
  def show 
    @history = History.find_by(ticker: params[:id])
  end

  def create
    @history = History.new(history_params)
    if @history.save
      render json: 'Success'
    else
      render json: @history.errors.full_messages, status: 401
    end
  end

  def update
    @history = History.find_by(ticker: params[:id])
    if !@history.update(history_update_params)
      render json: @history.errors.full_messages, status: 401
    end
  end

  private
  def history_params 
    params.require(:history).permit(:date, :history, :ticker)
  end

  def history_update_params 
    params.require(:history).permit(:date, :history)
  end

end
