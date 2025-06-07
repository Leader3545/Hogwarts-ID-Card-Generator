// ดึง DOM Elements ที่จำเป็น
const form = document.getElementById("idForm");
const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");

// กำหนดโลโก้ของแต่ละบ้าน
const houseLogos = {
  Gryffindor: "https://media.discordapp.net/attachments/1379351042306609194/1380932372220084275/1000038482-removebg-preview.png?ex=6845acfe&is=68445b7e&hm=9f39f1c7bfb9f5986cbf34c00414fa5c6b540bffa3595a771f64743398a67391&=&format=webp&quality=lossless&width=593&height=659",
  Slytherin: "https://media.discordapp.net/attachments/1379351042306609194/1380932371947458561/1000038481-removebg-preview.png?ex=6845acfd&is=68445b7d&hm=09ba04cefcfc24cd98f62e709d79548618cafb9820edd8a10c3e6c3205e6a188&=&format=webp&quality=lossless&width=400&height=400",
  Ravenclaw: "https://media.discordapp.net/attachments/1379351042306609194/1380932371687276575/1000038480-removebg-preview.png?ex=6845acfd&is=68445b7d&hm=f06c5934a1e45e279ecb9523a387af6323d988b5b6b801e71f5b4f70688b3ce2&=&format=webp&quality=lossless&width=625&height=625",
  Hufflepuff: "https://media.discordapp.net/attachments/1379351042306609194/1380932372467417128/1000038483-removebg-preview.png?ex=6845acfe&is=68445b7e&hm=658cd5f758df80001ed2c3baf483d8383360da24395f0ca3d2ae39c5a6db3bb6&=&format=webp&quality=lossless&width=593&height=658"
};

// กำหนดโลโก้โรงเรียน
const schoolLogo = "https://media.discordapp.net/attachments/1379351042306609194/1380948388526292992/1000038491-removebg-preview.png?ex=6845bbe8&is=68446a68&hm=7f6ecbd2dffe6de5fcc3774c6fd100d55e1a9629d6f6e0f3fcb188fa815966ee&=&format=webp&quality=lossless&width=625&height=625";

// ฟังก์ชันสำหรับวาดโลโก้โรงเรียน (วาดที่มุมล่างซ้าย ตัวอย่าง)
function drawSchoolLogo() {
  const logo = new Image();
  logo.onload = function () {
    // ตัวอย่างตำแหน่ง: วาดโลโก้โรงเรียนที่มุมล่างซ้าย (ตำแหน่ง 30, canvas.height - 110 โดยมีขนาด 80x80)
    ctx.drawImage(logo, 20, canvas.height - 285, 60, 60);
  };
  // กำหนด crossOrigin หากใช้งานภาพจากแหล่งภายนอก
  logo.crossOrigin = "anonymous";
  logo.src = schoolLogo;
}

// ฟังก์ชันสำหรับกำหนด Gradient ตามบ้าน
function getHouseGradient(house) {
  let gradient;
  switch (house) {
    case "Gryffindor":
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#ae0001"); // แดงเข้ม
      gradient.addColorStop(1, "#ffd700"); // ทอง
      break;
    case "Slytherin":
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#2a623d"); // เขียวเข้ม
      gradient.addColorStop(1, "#a9a9a9"); // เงิน
      break;
    case "Ravenclaw":
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#222f5b"); // น้ำเงินเข้ม
      gradient.addColorStop(1, "#ccc"); // เทาอ่อน ให้ความรู้สึกบรอนซ์
      break;
    case "Hufflepuff":
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#f0c75e"); // เหลืองทอง
      gradient.addColorStop(1, "#3b3b3b"); // ดำเข้ม
      break;
    default:
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#532e21");
      gradient.addColorStop(1, "#a5573d");
  }
  return gradient;
}

// วาดพื้นหลัง บัตร และหัวข้อ
function drawBackground(house) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = getHouseGradient(house);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 5;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px Serif";
  ctx.textAlign = "center";
  ctx.fillText("Hogwarts ID", canvas.width / 2, 50);
}

// วาดข้อมูลส่วนบุคคล
function drawTexts(data) {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("ชื่อ: " + data.name, 30, 100);
  ctx.fillText("วันเกิด: " + data.birthday, 30, 140);
  ctx.fillText("เพศ: " + data.gender, 30, 180);
  ctx.fillText("บทบาท: " + data.role, 30, 220);
  ctx.font = "italic 22px Serif";
  ctx.fillText("บ้าน: " + data.house, 30, 260);
  ctx.font = "italic 24px Serif";
  ctx.textAlign = "right";
  ctx.fillText("Hogwarts", canvas.width - 30, canvas.height - 30);
}

// วาดโลโก้ของบ้าน (ที่มุมบนซ้าย)
function drawHouseLogo(house) {
  if (house in houseLogos) {
    const logo = new Image();
    logo.onload = function () {
      // วาดโลโก้ที่มุมบนซ้าย (ตำแหน่ง 30, 60 โดยขนาด 80x80)
      ctx.drawImage(logo, 420, 15, 60, 60);
    };
    logo.src = houseLogos[house];
  }
}

// วาดรูปผู้ใช้ (ถ้ามี) ที่มุมบนขวา
function drawUserImage(imageSrc) {
  if (imageSrc) {
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, canvas.width - 170, 80, 120, 120);
    };
    img.src = imageSrc;
  }
}

// ฟังก์ชันวาดบัตรทั้งหมด
function drawCard(data) {
  drawBackground(data.house);
  drawTexts(data);
  drawHouseLogo(data.house);
  drawUserImage(data.image);
  // เรียกวาดโลโก้โรงเรียน
  drawSchoolLogo();
}

// จับเหตุการณ์เมื่อฟอร์มถูก submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    birthday: document.getElementById("birthday").value,
    gender: document.getElementById("gender").value,
    role: document.getElementById("role").value,
    house: document.getElementById("house").value,
    image: null
  };

  const fileInput = document.getElementById("userImage");
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      data.image = event.target.result;
      drawCard(data);
      
      // แสดง SweetAlert หลังวาดบัตรเสร็จ
      Swal.fire({
        icon: 'success',
        title: 'ทำรายการสำเร็จ!',
        showConfirmButton: false,
        timer: 2000
      });
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    drawCard(data);
    // แสดง SweetAlert หลังวาดบัตรเสร็จ
    Swal.fire({
      icon: 'success',
      title: 'ทำรายการสำเร็จ!',
      showConfirmButton: false,
      timer: 1500
    });
  }
});


// ฟังก์ชันดาวน์โหลดบัตรเป็นไฟล์ PNG
downloadBtn.addEventListener("click", function () {
  const link = document.createElement("a");
  link.download = "Hogwarts_ID_Card.png";
  link.href = canvas.toDataURL();
  link.click();
});

// วาดบัตรตัวอย่างเมื่อหน้าเว็บโหลดครั้งแรก
drawCard({
  name: "ตัวอย่าง",
  birthday: "2000-01-01",
  gender: "ไม่ระบุ",
  role: "นักเรียน",
  house: "Gryffindor",
  image: null
});
