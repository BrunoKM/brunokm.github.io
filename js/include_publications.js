var xhr = new XMLHttpRequest();
xhr.open("GET", "page_elements/publications.html", true);
xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    document.getElementById("publications-container").innerHTML = this.responseText;
  }
};
xhr.send();