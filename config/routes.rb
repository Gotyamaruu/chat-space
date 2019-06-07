Rails.application.routes.draw do
  root "messages#index"
  get  "messages/index"  => "messages#index"
end