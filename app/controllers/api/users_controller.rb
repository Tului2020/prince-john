class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end
  
  def update 
    @user = User.find_by(id: params[:id])
    ingrease_amount = Integer(user_deposit_params['deposit_amount'])
    if @user.balance + ingrease_amount < 0
      render json: 'Not enough money to take out from'
    else
      @user.update(balance: @user.balance + ingrease_amount)
      render json: {id: @user.id, username: @user.username, first_name: @user.first_name, last_name: @user.last_name, balance: @user.balance}
    end
  end


  private
  def user_params
    params.require(:user).permit(:username, :password, :first_name, :last_name, :balance)
  end

  def user_deposit_params
    params.require(:user).permit(:deposit_amount)
  end


end
