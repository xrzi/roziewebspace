function calcage() {
  var dob = new Date("07/07/2002");
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();
  
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff); 
  
  //extract year from date    
  var year = age_dt.getUTCFullYear();
  
  //now calculate the age of the user
  var age = Math.abs(year - 1970);
  
  //display the calculated age
  var elemid = document.getElementById("years");
  elemid.innerHTML = age;
  elemid.style.color = "#53cc7d";
  elemid.style.textDecoration="none";
  elemid.style.font = "vonique64";
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

async function copy_to_clipboard(element) {
  var rawdata = element.innerHTML;
  await navigator.clipboard.writeText(rawdata);

  var copied_alert_elem = document.getElementById("copied");
  copied_alert_elem.style.visibility = "visible";
  copied_alert_elem.style.opacity = "1";
  setTimeout(function(){
    copied_alert_elem.style.visibility = "hidden";
    copied_alert_elem.style.opacity = "0";
  }, 1300);
};

function post() {
  let title = document.getElementById("title-input").value;
  let content = document.getElementById("content-input").value;
  let xhr = new XMLHttpRequest();
  let url = "submit_post";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
 
      // Print received data from server
      console.log(this.responseText)
    }
  };
 
 
  // Converting JSON data to string
  var data = JSON.stringify({ "title": title, "content": content });
 
  // Sending data with the request
  xhr.send(data);

  let result = document.getElementById("post-result");
  result.style.visibility = "visible";
  result.style.opacity = "1";
  setTimeout(function(){
    result.style.visibility = "hidden";
    result.style.opacity = "0";
  }, 1300);
};


function minimize_sidenav() {
  var sidenav_element = document.getElementById("collapsable");
  if (sidenav_element.className == "sidenav") {
    sidenav_element.className += " sidenav-minimized"
  } else {
    sidenav_element.className = "sidenav"
  }
};

function theme_settings() {
  // unhide settings div
  var themepage = document.getElementById("themepage");
  if (themepage.className == "floating themehidden") {
    themepage.className = "floating"
  } else {
    themepage.className = "floating themehidden"
  }
}
