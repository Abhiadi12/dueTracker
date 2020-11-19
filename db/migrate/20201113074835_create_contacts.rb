class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.references :user, null: false, foreign_key: true
      t.decimal :amount
      t.string :duestatus

      t.timestamps
    end
  end
end
