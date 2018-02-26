class HomeController < ApplicationController
  def index
    @reports = Report.all
  end
end
