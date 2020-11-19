module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authorize_request, only: [:authenticate]

      def authenticate
        response = AuthenticateUser.new(params[:email], params[:password]).call
        render json: { current_user: response[:user], token: response[:token] }
      end

      def auto_login
        if current_user 
          render json: { current_user: current_user } 
        else
          render json: { message: " Please login "}
        end
      end

    end
  end
end