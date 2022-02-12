let getting;
let btnp = document.getElementById("getposition");
let isLive = false;
// gettign location
if (
  localStorage.getItem("longitude") != null &&
  localStorage.getItem("latitude") != null
) {
  document.getElementById(
    "position"
  ).innerHTML = `<iframe height="390" width="300" src="https://www.openstreetmap.org/export/embed.html?bbox=${localStorage.getItem(
    "longitude"
  )},${localStorage.getItem("latitude")}&;layer=mapnik"></iframe>`;
}
// getting location when clicking the button 
btnp.addEventListener("click", (eo) => {
  getting = navigator.geolocation.watchPosition(
    function (position) {
      let positionn = document.getElementById("position");
      positionn.innerHTML = `<iframe height="390" width="300" src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik"></iframe>`;
      localStorage.setItem("longitude", position.coords.longitude);
      localStorage.setItem("latitude", position.coords.latitude);
    },
    function (error) {
      localStorage.clear();
      document.querySelector("iframe").style.display = "none";
      btnp.innerHTML = "Seriously ? " + `<div class="emoji"> &#128530;</div>`;
      isLive = false;
      let errorr = document.querySelector(".error .container");
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorr.innerHTML = `<div class="denied">PERMISSION DENIED &#128557;</div>`;
          position.style.display ="none"
          break;
        case error.POSITION_UNAVAILABLE:
          errorr.innerHTML = `<div class="unavailble">POSITION UNAVAILABLE</div> `;
          break;
      }
    }
  );
// changing the button's text 
  if (isLive === false) {
    btnp.innerHTML =
      "Hide my location " + `<div class="emoji"> &#128127;</div>`;
    isLive = true;
  } else if (isLive === true) {
    navigator.geolocation.clearWatch(getting);
    btnp.innerHTML =
      "Give my location " + `<div class="emoji"> &#127968;</div>`;
    isLive = false;
  }
});
// giving an alert to mobile users
let user = navigator.userAgent.toLowerCase();
if (user.includes("mobile")) {
  alert("i am using a mobile !");
}


