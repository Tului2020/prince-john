class Api::HistoriesController < ApplicationController
  def show 
    @history = History.find_by(ticker: params[:id]) || {ticker: nil, date: nil, history: nil}
  end


  def update
    @history = History.find_by(ticker: params[:id])

    if (!@history)
      @history = History.new(history_params)
      @history['ticker'] = params[:id]

      if @history.save
        render json: 'Success'
      else
        render json: @history.errors.full_messages, status: 401
      end
    else 
      if !@history.update(history_update_params)
        render json: @history.errors.full_messages, status: 401
      end
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
