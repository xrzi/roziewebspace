function minimize_sidenav() {
  var sidenav_element = document.getElementById("collapsable");
  var is_minimized = sidenav_element.classList.contains("sidenav-minimized")
  if (!is_minimized) {
    sidenav_element.classList.add("sidenav-minimized")
  } else {
    sidenav_element.classList.remove("sidenav-minimized")
  }
};
