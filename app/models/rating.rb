class Rating < ApplicationRecord
  belongs_to :user

  def self.all_positive_rating
    Rating.all.select {|rating| rating.value > 0}
  end

  def user_name
    user.username
  end
end
