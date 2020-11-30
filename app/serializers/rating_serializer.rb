class RatingSerializer
  include JSONAPI::Serializer
  attributes :value, :user_id, :user_name
  attribute :time do |object|
    object.updated_at.strftime("%F on: %T")
  end
end
