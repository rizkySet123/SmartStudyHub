document.addEventListener("DOMContentLoaded", function (event) {
  const pathName = window.location.pathname;

  const charts = {
    "/": () => {
      pertumbuhanSiswaChart(dataPertumbuhanSiswa, 150);
      showJurusanComparison(dataSiswa);
      createBrowserUsageChart(browserData);
    },
    "/analitik": () => {
      gambaranDataSekolah(dataSekolah);
      pertumbuhanSiswaChart(dataPertumbuhanSiswa1, 250);
      pertumbuhanSiswaBerdasarkanJurusan();
      scatterplotDistribusiNilai();
      tingkatPemahamanSiswa();
      jumlahSiswaBerdasarkanJurusanRow();
      chartJenisKelamin();
      kinerjaSiswaDalamUjian();
    },
  };

  if (charts[pathName]) charts[pathName]();

  const toggleClass = (element, className) => {
    element.classList.toggle(className);
  };

  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        ["show", "bx-x", "body-pd", "body-pd"].forEach((cls, index) => {
          toggleClass([nav, toggle, bodypd, headerpd][index], cls);
        });
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    linkColor.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  }

  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Popup compatible device
  var modal = document.getElementById("infoModal");
  var span = document.getElementsByClassName("close")[0];
  var out = document.getElementsByClassName("out")[0];
  span.onclick = () => (modal.style.display = "none");
  out.onclick = () => (modal.style.display = "none");

  $(document).on('click', ".modalAdd",function() {
    const tma = $(this).data('type')
    $('#staticBackdropLabel').html(`Tambah Data ${tma}`)
    $('.modal-body form').attr(`action','/tambah/data/${tma}`)
    $('form button[type=submit]').html('Tambah Data')
    $('.modal').show()
  })

  // Widget waktu
  function addLeadingZero(num) {
    return (num < 10 ? "0" : "") + num;
  }

  function getCurrentTime() {
    var now = new Date();
    return {
      jam: addLeadingZero(now.getHours()),
      menit: addLeadingZero(now.getMinutes()),
      detik: addLeadingZero(now.getSeconds()),
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

  const adjustClasses = (selector, oldClasses, newClasses) => {
    $(selector).each(function () {
      $(this).removeClass(oldClasses).addClass(newClasses);
    });
  };

  adjustClasses(
    "#table-data_wrapper .col-md-auto.me-auto",
    "col-md-auto me-auto",
    "col-12 col-sm-6 d-flex justify-content-center justify-content-sm-start"
  );
  adjustClasses(
    "#table-data_wrapper .col-md-auto.ms-auto",
    "col-md-auto ms-auto",
    "col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end"
  );

  // update data 
  $(document).on('click', '.modalUpdate', function() {
    const entities = $(this).data('type')

    $('#staticBackdropLabel').html(`Ubah Data ${entities}`)
    $('form button[type=submit]').html('Ubah Data')
    $('.modal-body form').attr(`action','/update/data/${entities}`)
    const id = $(this).data('id')
    getData(id, entities)
    $('.modal').show()
  })

  const getData = (id, entities) => {
    $.ajax({
      url: '/get/data',
      method: 'get',
      data: {
        entities: entities,
        id: id
      },
      success: response => {
        const data = response[0]
        const tdb = data.tdb.split(',')[0];
        const [tanggal, bulan, tahun] = tdb.split('-');
        const tanggalObjek = new Date(`${tahun}-${bulan}-${tanggal}`);

        $('#namaGuru').val(data.name)
        $('#nktam').val(data.zipcode)
        flatpickr(`#tanggalLahir${entities}`, {
          defaultDate: tanggalObjek
        });
        $('#lakiLaki').prop('checked', true);
        $(`#jabatan`).val(data.street)
        $(`#mapelYangDiajar`).val(data.id)
        $(`#nomorTelepon${entities}`).val('08' + data.zipcode.replace('-', ''));
        $(`#email${entities}`).val(data.email)
      }
    })
  }
});

// filter data table
const selectKelas = document.getElementById("select-kelas");
const selectJenjang = document.getElementById("select-jenjang");
const selectJurusan = document.getElementById("select-jurusan");
const applyButton = document.getElementById("apply-button");
const box = document.getElementById("toggleBox");

const toggleBox = () => {
  box.classList.toggle("show");
};

selectKelas.addEventListener("change", function () {
  const isSemuaKelas = selectKelas.value === "semua kelas";
  selectJenjang.disabled = !isSemuaKelas;
  selectJurusan.disabled = !isSemuaKelas;
  selectJenjang.selectedIndex = isSemuaKelas ? 0 : 0;
  selectJurusan.selectedIndex = isSemuaKelas ? 0 : 0;
});

applyButton.addEventListener("click", function () {
  selectedValues = [];
  console.log(selectJenjang.value, selectJurusan.value, selectKelas.value);

  if (selectKelas.value == "semua kelas") {
    if (selectJenjang.value == "" && selectJurusan.value == "") {
      alert("dafault");
      box.classList.toggle("show");
    } else {
      if (selectJurusan.value !== "") {
        selectedValues.push(selectJurusan.value);
      }
      if (selectJenjang.value !== "") {
        selectedValues.push(selectJenjang.value);
      }
      alert(selectedValues);
      box.classList.toggle("show");
    }
  } else {
    alert("Data Dipilih: " + selectKelas.value);
    box.classList.toggle("show");
  }
});

// form validate
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function a() {
  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Data Yang Dihapus Tidak Dapat Dikembalikan",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Berhasil!",
        text: "Data Berhasil Dihapus",
        icon: "success"
      });
    }
  });
}

// sweetalert2
$(document).on('click', '.confirmalert', function() {
  // comfirmasi alert
  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Data Yang Dihapus Tidak Dapat Dikembalikan",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Berhasil!",
        text: "Data Berhasil Dihapus",
        icon: "success"
      });
    }
  });

  $('.main').css('width', '100%')

  // confirminputalert
  $(document).on('click', '.confirminputalert', function() {
    console.log('ansjh');
    Swal.fire({
      title: 'Enter your input',
      input: 'text',
      inputPlaceholder: 'Type your input here...',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter something!';
        } else if (value !== 'anjsh') {
          return 'Input is incorrect!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi, tampilkan pesan sukses
        Swal.fire('Success!', `Your input is: ${result.value}`, 'success');
      }
    });
  })
  
});
