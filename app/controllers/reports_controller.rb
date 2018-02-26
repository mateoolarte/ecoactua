class ReportsController < ApplicationController
  before_action :authenticate_user!, only: :new
  before_action :find_report, only: [:destroy, :update]

  def index
    @reports = Report.all
  end

  def new
    @report = Report.new
  end

  def create
    @report = Report.new(report_params)

    if @report.save
      redirect_to reports_path, notice: "El reporte ha sido creado con éxito"
    else
      render :new  
    end
  end
  
  def update
    if @report.update(report_params)
      redirect_to administracion_path, notice: "El reporte ha sido actualizado con éxito"
    else
      redirect_to administracion_path, alert: "Hubo un problema al actualizar el reporte"  
    end
  end
  
  def destroy
    @report.destroy

    redirect_to reports_path, notice: "El reporte fue eliminado con éxito"
  end

  private
  def report_params
    params.require(:report).permit(:address, :description, :type_report_id, :state, :pointlat, :pointlong, :user_id)
  end

  def find_report
    @report = Report.find(params[:id])
  end
end
