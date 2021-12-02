export function fbIniConfig() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "939932633596851",
      cookie: true,
      xfbml: true,
      version: "v12.0",
    });

    window.FB.AppEvents.logPageView();
  };
  console.log("loading FB api");
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}
export function handlefbLogin() {
  window.FB.login(checkLoginState());

  function testAPI() {
    console.log("Welcome!  Fetching your information.... ");
    window.FB.api("/me", function (response) {
      console.log("Successful login for: " + response.name);
      document.getElementById("status").innerHTML =
        "Thanks for logging in, " + response.name + "!";
    });
  }

  function statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    if (response.status === "connected") {
      testAPI();
    } else if (response.status === "not_authorized") {
      console.log("Please log into this app.");
    } else {
      console.log("Please log into this facebook.");
    }
  }

  function checkLoginState() {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }
}
