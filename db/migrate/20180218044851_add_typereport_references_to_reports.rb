class AddTypereportReferencesToReports < ActiveRecord::Migration[5.1]
  def change
    add_reference :reports, :type_report, foreign_key: true
  end
end
