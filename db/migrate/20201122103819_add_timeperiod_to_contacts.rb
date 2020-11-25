class AddTimeperiodToContacts < ActiveRecord::Migration[6.0]
  def change
    add_column :contacts, :timeperiod, :date
  end
end
