Rails.application.routes.draw do
  post "/evaluate", to: "code#evaluate"
  get "*path", to: static("index.html")
end
