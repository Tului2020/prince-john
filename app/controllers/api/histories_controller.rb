class Api::HistoriesController < ApplicationController
  def show 
    # debugger
    @history = History.find_by(ticker: params[:id])
  end

end
