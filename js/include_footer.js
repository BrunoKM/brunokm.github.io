var xhr = new XMLHttpRequest();
xhr.open("GET", "page_elements/footer.html", true);
xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    document.getElementById("footer-container").innerHTML = this.responseText;
  }
};
xhr.send();