class AdministrationsController < ApplicationController
  before_action :restrict_access, only: :index

  def index
    @reports = Report.order(created_at: :desc)
    @type_of_reports = TypeReport.all

    @reports = @reports.where("description ILIKE ?", "%#{params[:description]}%") if params[:description].present?

    @reports = @reports.where("state ILIKE ?", "%#{params[:state]}%") if params[:state].present?

    @reports = @reports.where("type_report_id = ?", params[:type_report_id]) if params[:type_report_id].present?
  end

  private
  def restrict_access
    if current_user == nil
      redirect_to new_user_session_path, alert: "Debes crear una cuenta para ingresar"
    else
      redirect_to reports_path, alert: "Debes tener permisos de administrador para ingresar" if current_user.role != "admin"  
    end
  end
end