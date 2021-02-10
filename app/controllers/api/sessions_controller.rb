class Api::SessionsController < ApplicationController

  # before_action :require_signed_in!, only: [:destroy]

  def destroy
    sign_out!
    render '/login'
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      sign_in!(@user)
      redirect_to '/'
    # else
    #   console.log('Invalid username and/or password')
    end
  end


end
