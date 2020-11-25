class ContactSerializer
  include JSONAPI::Serializer
  attributes :name, :email, :phone, :user_id, :amount, :duestatus, :timeperiod
end
