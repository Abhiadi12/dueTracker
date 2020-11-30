module Api 
  module V1
    class UsersController < ApplicationController
      skip_before_action :authorize_request, only: [:create, :search]
       
      def create
        user = User.new(user_params)
        if user.save 
          Rating.create(value: 0, user: user)
          token = JsonWebToken.encode(user_id: user.id)
          render json: { current_user: user, token: token }
        else
          render json: { errors: user.errors.messages }
        end    
      end

      def destroy
        unless current_user.nil?
          current_user.destroy
          head :no_content
        else
          render json: { message: " user is already deleted " }
        end
      end

      def show
        render json: { current_user: current_user }, status: 200
      end

      def update
        if current_user.authenticate(params[:password])
          if current_user.update(update_user_params)
            token = JsonWebToken.encode(user_id: current_user.id)
            render json: { current_user: current_user, token: token } 
          else
            render json: { errors: current_user.errors.messages }
          end
        else 
          render json: { message: "Password is incorrect" }, status: :unprocessable_entity
        end 
      end

      def update_password
        current_user.update(update_password_params)
        render json: { message: " Password change successfully "}
      end

      def search
        render json: { users: User.getUsersByQuery(params[:value].downcase)}
      end

      def find_user
        user =  User.find_by!(username: params[:name])
        render json: { user: user}
      end

      private
      
      def user_params
        params.permit(:username, :email, :password, :phone, :country)
      end

      def update_user_params
        params.permit(:username, :email, :phone, :country)
      end

      def update_password_params
        params.permit(:password)
      end

    end
  end
end