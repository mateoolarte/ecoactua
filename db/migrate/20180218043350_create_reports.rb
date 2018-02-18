class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.string :address
      t.text :description
      t.string :pointlat
      t.string :pointlong
      t.string :state

      t.timestamps
    end
  end
end
