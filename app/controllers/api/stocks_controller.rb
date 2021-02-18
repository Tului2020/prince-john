class Api::StocksController < ApplicationController
  def index
    @user = User.find_by(id: params[:user_id])
  end

  def create

  end

  def destroy
  end
end
