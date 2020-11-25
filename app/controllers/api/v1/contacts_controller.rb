module Api 
  module V1
    class ContactsController < ApplicationController

      def create
        contact = current_user.contacts.create!(contact_params)
        render json:  ContactSerializer.new(contact)
      end

      def user_posts
        render json:  ContactSerializer.new(current_user.contacts)
      end

      def destroy
        contact = Contact.find(params[:id]);
        unless contact.nil?
          contact.destroy
          head :no_content
        else
          render json: { message: " contact is already deleted " }, status: 422
        end
      end

      def show 
        contact = Contact.find(params[:id])
        render json:  ContactSerializer.new(contact)
      end

      def update
        contact = Contact.find(params[:id])
        contact.update!(contact_params)
        render json: ContactSerializer.new(contact);
      end

      private

      def contact_params
        params.permit(:name, :email, :phone, :amount, :duestatus, :timeperiod)
      end
      
    end
  end
end