Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :notes
    resources :medication_reports
    resources :strip_reports
    resources :symptom_reports
  end

  post "/evaluate", to: "code#evaluate"
  get "*path", to: static("index.html")

  root to: "admin/users#index"
end
