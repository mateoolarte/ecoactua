class Report < ApplicationRecord
  belongs_to :user

  validates :address, :type_report_id, :description, presence: true
end
