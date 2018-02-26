$(document).on("turbolinks:load", () => {
  $(".form-report__types-box").on("click", function () {
    const typeReportID = $(this).data("typereport")

    if (!$(this).hasClass("block-click")) {
      $("input#report_type_report_id").attr("value", typeReportID)

      $(".form-report__types-box").removeClass("scale-up")
      $(this).addClass("scale-up")
    }
  })

  $("#state option:first").attr("label", "Estado del reporte")
  $("#type_report_id option:first").attr("label", "Tipo de reporte")
})