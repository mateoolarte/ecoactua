class ReportsController < ApplicationController
  def index
    @reports = Report.all
  end

  def new
    @report = Report.new
  end

  def create
    @report = Report.new(report_params)

    if @report.save
      redirect_to reports_path, notice: "El reporte ha sido creado con exito"
    else
      render :new  
    end
  end  

  private
  def report_params
    params.require(:report).permit(:address, :description, :type_report_id, :state, :pointlat, :pointlong, :user_id)
  end
end
