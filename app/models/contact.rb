class Contact < ApplicationRecord
  belongs_to :user
  validates :email, uniqueness: { scope: :user_id,
    message: "must be unique per scope" }
  validates :phone, uniqueness: { scope: :user_id, message: "must be unique per scope" }
end
