$(document).on("turbolinks:load", () => {
  // Dropdown User signed
  $(".btn--dropdown").click(function (e) {
    $(this).children(".caret").toggleClass("rotate-caret")
    $(".main-nav__dropdown").toggleClass("open-menu-dropdown")
  })

  const breakpoint = window.matchMedia('(max-width: 1023px)')

  // Change Mobile/Desktop menu
  if (breakpoint.matches) {
    $('.main-nav').addClass('main-nav--mobile')

    // Menu mobile
    const sidebarBox = document.querySelector('.main-nav--mobile'),
      sidebarBtn = document.querySelector('.btn--menu-mobile'),
      pageWrapper = document.querySelector('.container')

    sidebarBtn.addEventListener('click', event => {
      event.stopPropagation()
      sidebarBtn.classList.toggle('active')
      sidebarBox.classList.toggle('active')
    })

    pageWrapper.addEventListener('click', event => {

      if (sidebarBox.classList.contains('active')) {
        sidebarBtn.classList.remove('active')
        sidebarBox.classList.remove('active')
      }
    })

    window.addEventListener('keydown', event => {

      if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
        sidebarBtn.classList.remove('active')
        sidebarBox.classList.remove('active')
      }
    })
  } else {
    $('.main-nav').removeClass('main-nav--mobile')
  }
})