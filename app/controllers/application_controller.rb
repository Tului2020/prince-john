class ApplicationController < ActionController::Base

  # helper_method :is_admin?, :current_user, :sign_out!, :signed_in?

  # def errors(ob)
  #   ob.errors.full_messages
  # end

  # def correct_user?(user_id)
  #   current_user.id == user_id || is_admin?
  # end


  # def require_correct_user!(user_id=params[:user_id], redirect_to_link='/')
  #   unless correct_user?(user_id.to_i)
  #     flash.now[:errors] = ['Incorrect user, redirected']
  #     redirect_to redirect_to_link 
  #   end
  # end


  # def is_admin?
  #   current_user == User.first
  # end

  # def require_admin!
  #   redirect_to trees_url unless is_admin?
  # end

  helper_method :current_user, :sign_out!, :signed_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def sign_in!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def sign_out!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def signed_in?
    !!current_user
  end


end
