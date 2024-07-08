var xhr = new XMLHttpRequest();
xhr.open("GET", "page_elements/publications.html", true);
xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    document.getElementById("publications-container").innerHTML = this.responseText;
  }
  // Now safe to manipulate the DOM
  initializeOrModifyAsciiArtDiffusion();
};
xhr.send();


function initializeOrModifyAsciiArtDiffusion() {
    console.log("loaded");
    // Define a original content array as a fixed string:
    // const originalContentText = "████\n" + "█   \n" + "████\n" + "█  █\n" + "████";
    // Same but as array
    // const originalContentArray = ["████", "█░░░", "████", "█░░█", "████"]
    // const originalContentArray = ["░░████░░", "░░█░░░░░", "░░████░░", "░░█░░█░░", "░░████░░"]
    const originalContentArray = ["░░░░░░░░","░░████░░", "░░█░░░░░", "░░████░░", "░░█░░█░░", "░░████░░", "░░░░░░░░"];
    // console.log(typeof originalContentArray);
    const element = document.getElementById('asciiArtDiffusionInSix');
    // console.log(typeof element.textContent);

    element.textContent = originalContentArray;

    // let contentArray = element.textContent.split("\n");
    function flipCharacter() {
        console.log("echo");
        let newContent = originalContentArray.map(line => {
            return Array.from(line).map(char => {
                // Randomly chooses to flip the character or not
                return Math.random() > 0.95 ? (char === '░' ? '█' : '░') : char;
            }).join('');
        }).join('\n');
        element.innerText = newContent;
    }

    setInterval(flipCharacter, 400);
};