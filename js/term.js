var command = document.getElementById("cmd_line");
var commandArry = [];
var video = document.createElement("iframe");
video.className = "screen";
video.setAttribute("width", "100%");
video.setAttribute("height", 300);
video.setAttribute("frameborder", 0);
video.style.maxWidth = "450px";
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', autosize);  

/////////////////////////////////////////////////////
///////////////  KEYBOARD EVENTS ////////////////////
/////////////////////////////////////////////////////

var elem = document.getElementById("cmd_line");
elem.onkeyup = function(e) { // ESC
  if (e.keyCode == 13){
    var command_value = command.value.replace(/(\r\n|\n|\r)/gm,"");
    if (command_value == "") {
      document.getElementById("cmd_line").value = "";
      document.getElementById("cmd_line").focus();
    } else {
      commandArry.push(command_value);
      i = commandArry.length;
      runCode();
      document.getElementById("cmd_line").scrollIntoView();
    }
  }
  else if (e.keyCode == 38) { // UP
    console.log(commandArry);
    console.log(i);
    if (i > 0) {
      i--; 
      document.getElementById("cmd_line").value = commandArry[i];
    } else {
      document.getElementById("cmd_line").value = "";
    }
  }
  else if (e.keyCode == 40) { // DOWN
    console.log(commandArry);
    console.log(i);
    if (i < commandArry.length) { 
      document.getElementById("cmd_line").value = commandArry[i];
      i++;
    } else {
      document.getElementById("cmd_line").value = "";
    }
  }
}

/////////////////////////////////////////////////////
//////////////////  FINDING CMD /////////////////////
/////////////////////////////////////////////////////

function runCode() {
  var command_value = command.value.replace(/(\r\n|\n|\r)/gm,"");
  var code = document.createElement("p");
  
  if ( command_value == "exit" ) {
    exit();
  } 
  else if ( command_value == "clear" ) {
    clear();
  } 
  else {
    code.className = "cmd";
    code.innerHTML = command_value + '<span class="comment"> ↵</span>';
    document.getElementById("terminal_screen").appendChild(code);
    
    if ( command_value == "--help" || command_value == "help" ) {
      help();
    } else if (command_value == "whoami") {
      whoami();
    } else if (command_value == "video -l" || command_value == "video list") {
      video_list();
    } else if (command_value.split(' ').slice(0,2).join(' ') == "video -p" || command_value.split(' ').slice(0,2).join(' ') == "video play") {
      video_play(command_value.split(' ').slice(2).join(' '));
    } else {  
      code = document.createElement("p");
      code.className = "error";
      code.innerHTML = '"' + command_value + '" is not defined! <pre class="warning"> ¯\\_(ツ)_/¯ </pre>';
      document.getElementById("terminal_screen").appendChild(code);
    }
  }
  cmd_clear();
}

/////////////////////////////////////////////////////
/////////////////  CMD FUNCTIONS ////////////////////
/////////////////////////////////////////////////////

function exit() {
  window.close();
  alert("Exit function does not work on Codepen!");
}

function clear() {
  var ps = document.getElementById("terminal_screen").querySelectorAll("*");
  var ps_length = ps.length;
  var i;
  for(i = ps_length - 1; i >= 0; i--) {
    ps[i].remove();
  }
}

function help() {
  code = document.createElement("div");
  code.innerHTML = `<center>
    <p class="warning"><i class="fa fa-question-circle" aria-hidden="true"></i>
 Available Menu</p>
    <ul class="list">
      <li>whoami</span></li>
      <li>video list</li>
      <li>video play &lsaquo;video_name&rsaquo;</li>
      <li>clear</li>      
      <li>exit</li>
    </ul></center>`;
  document.getElementById("terminal_screen").appendChild(code);
}

function whoami() {
  code = document.createElement("p");
  code.innerHTML = "nevcanuludas";
  document.getElementById("terminal_screen").appendChild(code);
}

function video_play(x) {
  code = document.createElement("p");
  if ( x == 'TNT' ) {
    code.innerHTML = '<span class="info">"AC/DC - T.N.T. (from Live at River Plate)"</span> is starting...';
    video.setAttribute("src", "https://www.youtube.com/embed/44XYEeD1A1U");
    document.getElementById("terminal_screen").appendChild(code);
    document.getElementById("terminal_screen").appendChild(video);
  } else if ( x == 'Smooth Criminal' ) {
    code.innerHTML = '<span class="info">"Michael Jackson - Smooth Criminal (Official Video)"</span> is starting...';
    video.setAttribute("src", "https://www.youtube.com/embed/h_D3VFfhvs4");
    document.getElementById("terminal_screen").appendChild(code);
    document.getElementById("terminal_screen").appendChild(video);
  } else {
    code = document.createElement("p");
    code.className = "error";
    code.innerHTML = 'Ops! "' + x + '"<center> could not be found! <pre class="warning"> ¯\\_(ツ)_/¯ </pre><center>';
    document.getElementById("terminal_screen").appendChild(code);
  }
}

function video_list() {
  code = document.createElement("div");
  code.innerHTML = `
    <p class="warning"><i class="fa fa-music" aria-hidden="true"></i>
 Here is the list</p>
    
    <ul class="list">
      <li>TNT <span class="comment">AC/DC</span></li>
      <li>Smooth Criminal <span class="comment">Michael Jackson</span></li>
    </ul>
   
    <p class="info">Use 'video -p &lsaquo;video_name&rsaquo;' command for listening the song...</p>
    
  `;
  document.getElementById("terminal_screen").appendChild(code);
}

function cmd_clear() {
  command.value = "";
}

/////////////////////////////////////////////////////

function autosize() {
  var el = this;
  setTimeout(function() {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
}

function setFocus() {
  document.getElementById("cmd_line").focus();
}
