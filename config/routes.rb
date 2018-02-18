Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"

  get '/reportes', to: 'reports#index', as: 'reports'
  post '/reportes', to: 'reports#create'
  get '/reporte', to: 'reports#new', as: 'new_report'
  put '/editar/:id', to: 'reports#update'
  delete '/eliminar/:id', to: 'reports#destroy'
end
