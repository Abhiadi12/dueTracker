class ApplicationController < ActionController::Base
  include Pundit
  include ExceptionHandler
  skip_before_action :verify_authenticity_token
  before_action :authorize_request
  attr_reader :current_user

  private

  # Check for valid request token and return user
  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
