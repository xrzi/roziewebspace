window.onload = function calcage() {
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

