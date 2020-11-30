Rails.application.routes.draw do
  root 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, except: [:new, :edit, :index] do
        resources :contacts, except: [:new, :edit, :index]
      end
      post "/login", to: "auth#authenticate"
      get "/auto_login", to: "auth#auto_login"
      put "/change_password", to: "users#update_password"
      get "/contacts", to: "contacts#user_posts"
      get "/ratings", to: "ratings#index"
      get "/get_score", to: "ratings#get_score"
      patch "/rate_by_user", to: "ratings#rate_by_user"
      get "/search", to: "users#search"
      get "find_user/:name", to: "users#find_user"
    end
  end

  get '*path', to: 'welcome#index', via: :all
end
