module Api
  module V1
    class RatingsController < ApplicationController
      skip_before_action :authorize_request, only: [:index]

      def index
        ratings = Rating.all_positive_rating
        render json: RatingSerializer.new(ratings);
      end

      def get_score
        score_given_by_user = Rating.find_by(user_id: current_user.id)
        render json: {score: score_given_by_user}
      end

      def rate_by_user
        user_review =  Rating.find_by(user_id: current_user.id)
        user_review.update!(value: params[:rating])
      end
      
    end
  end
end