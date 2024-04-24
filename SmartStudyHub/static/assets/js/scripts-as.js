document.addEventListener("DOMContentLoaded", function (event) {
  const pathName = window.location.pathname;

  if (pathName == "/") {
    pertumbuhanSiswaChart(dataPertumbuhanSiswa, 150);
    showJurusanComparison(dataSiswa);
    createBrowserUsageChart(browserData);
  }

  if (pathName == "/analitik") {
    gambaranDataSekolah(dataSekolah);
    pertumbuhanSiswaChart(dataPertumbuhanSiswa, 250);
  }

  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("show");
        toggle.classList.toggle("bx-x");
        bodypd.classList.toggle("body-pd");
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  //popup compatible device
  var modal = document.getElementById("infoModal");
  var span = document.getElementsByClassName("close")[0];
  var out = document.getElementsByClassName("out");

  span.onclick = function () {
    modal.style.display = "none";
  };

  out.onclick = function () {
    window.location.href = "/login";
  };

  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };
});

// widget waktu
function addLeadingZero(num) {
  return (num < 10 ? "0" : "") + num;
}

function getCurrentTime() {
  var now = new Date();
  var hours = addLeadingZero(now.getHours());
  var minutes = addLeadingZero(now.getMinutes());
  var seconds = addLeadingZero(now.getSeconds());
  return {
    jam: hours,
    menit: minutes,
    detik: seconds,
  };
}

function updateClock() {
  var time = getCurrentTime();
  $(".jam").text(time.jam);
  $(".menit").text(time.menit);
  $(".detik").text(time.detik);
}

setInterval(updateClock, 1000);

updateClock();

$(document).ready(function () {
  $("#table-data_wrapper .col-md-auto.me-auto").each(function () {
    $(this)
      .removeClass("col-md-auto me-auto")
      .addClass(
        "col-12 col-sm-6 d-flex justify-content-center justify-content-sm-start"
      );
  });

  $("#table-data_wrapper .col-md-auto.ms-auto").each(function () {
    $(this)
      .removeClass("col-md-auto ms-auto")
      .addClass(
        "col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end"
      );
  });
});
