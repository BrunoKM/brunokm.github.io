var xhr = new XMLHttpRequest();
xhr.open("GET", "page_elements/blog-posts.html", true);
xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    document.getElementById("blog-posts-container").innerHTML = this.responseText;
  }
};
xhr.send();