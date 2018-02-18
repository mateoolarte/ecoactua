class AddUseridToReports < ActiveRecord::Migration[5.1]
  def change
    add_reference :reports, :user, foreign_key: true
  end
end
