class CreateTypeReports < ActiveRecord::Migration[5.1]
  def change
    create_table :type_reports do |t|
      t.string :name

      t.timestamps
    end
  end
end
