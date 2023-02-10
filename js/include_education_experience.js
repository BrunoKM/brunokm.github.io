var xhr = new XMLHttpRequest();
xhr.open("GET", "page_elements/education_experience.html", true);
xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    document.getElementById("education-experience-container").innerHTML = this.responseText;
  }
};
xhr.send();