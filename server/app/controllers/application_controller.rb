class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def user
    @user ||= User.first || User.create!(
      uuid: "abc123",
      name: "Test User",
      treatment_start: Time.current,
    )
  end
end
