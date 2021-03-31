Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do 
    resources :histories, only: [:show, :update]

    resources :users, only: [:create, :show, :update] do
      resources :stocks, only: [:create, :destroy, :index]
    end
    resource :session, only: [:create, :destroy] 
  end
  
end
