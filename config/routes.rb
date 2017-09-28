Rails.application.routes.draw do

  root 'home#index'
  get '/about' => 'home#about'

  get 'users/signup'=> 'home#index'
  get 'users/edit'
  get 'users/:id' => 'users#show'
  get 'users/index' => 'users#index'
  post 'users/signup' => 'users#create'

  get 'login' => 'home#index'
  post 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'

  resources :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
