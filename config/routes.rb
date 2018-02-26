Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"

  get '/reportes', to: 'reports#index', as: 'reports'
  post '/reportes', to: 'reports#create'
  get '/reporte', to: 'reports#new', as: 'new_report'
  put '/reporte/editar/:id', to: 'reports#update', as: 'update_report'
  delete '/reporte/eliminar/:id', to: 'reports#destroy', as: 'destroy_report'

  get '/usuario/:username', to: 'users#show', as: 'user_profile'

  get '/administracion', to: 'administrations#index'
end
