function post() {
  let title = document.getElementById("title-input").value;
  let content = document.getElementById("content-input").value;
  let xhr = new XMLHttpRequest();
  let url = "submit_post";
  var reply = "none"

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
 
      // Print received data from server
      console.log(this.responseText);
      reply = this.responseText;
    }
  };
 
 
  // Converting JSON data to string
  var data = JSON.stringify({ "title": title, "content": content });
 
  // Sending data with the request
  xhr.send(data);

  let result = document.getElementById("post-result");
  result.innerHTML = reply;
  document.getElementById("title-input").value="";
  document.getElementById("content-input").value="";
  result.style.visibility = "visible";
  result.style.opacity = "1";
  setTimeout(function(){
    result.style.visibility = "hidden";
    result.style.opacity = "0";
    window.location.reload();
  }, 1300);
};
