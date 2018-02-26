$(document).on("turbolinks:load", () => {
  $(".admin__update-state .table-reports__state").on("click", function () {
    $(this).find(".caret").toggleClass("rotate-caret")
    $(this).siblings(".admin__update-dropdown").toggleClass("admin__update-dropdown-active")
  })
})