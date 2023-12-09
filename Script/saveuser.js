//-----!imgSave👇
let imgnumber = false;
var profilePic = document.getElementById("profile-pic");
var inputFile = document.getElementById("input-file");
let cardImg = document.querySelector(".card1");
let btnImg = document.querySelector(".btnimg");
var reader = new FileReader();
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (file == null) {
    alert("عکسی وارد نشد");
  }
  else{
    var imgSave = URL.createObjectURL(file);
    profilePic.src = imgSave;
    reader.addEventListener("load", () => {
      reader.result;
      imgnumber = true;
      cardImg.style.boxShadow = `rgba(131, 255, 115, 0.792) 0px 54px 55px,
       rgba(166, 255, 125, 0.769) 0px -12px 30px, rgba(109, 255, 114, 0.706) 0px 4px 6px,
      rgba(104, 255, 93, 0.722) 0px 12px 13px, rgba(97, 255, 97, 0.665) 0px -3px 5px`;
  
      cardImg.style.border = "1px solid rgb(98, 255, 0)";
      btnImg.style.backgroundColor = "#198754";
      btnImg.style.border = "#198754";
      btnImg.innerHTML = "تصویر اضافه شد";
    });
    reader.readAsDataURL(file);
  }
});
//-----!imgSave☝
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const phone = document.querySelector(".number");
const form = document.querySelector("#form");
const birthday = document.querySelector("#test-date-id");

let maxLengthPhone = phone.getAttribute("maxlength");

let option1 = {
  buttonsColor: "red",
  forceFarsiDigits: true,
  markToday: true,
  markHolidays: true,
  highlightSelectedDay: true,
  pastYearsCount: 52,
  futureYearsCount: 3,
  nextButtonIcon: "./img/timeir_next.png",
  previousButtonIcon: "./img/timeir_prev.png",
  buttonsColor: "red",
};
kamaDatepicker("test-date-id", option1);

phone.addEventListener("keypress", (event) => {
  var ch = String.fromCharCode(event.which);
  if (!/[0-9]/.test(ch)) {
    event.preventDefault();
  }
});
birthday.addEventListener("keypress", (event) => {
  var ch = String.fromCharCode(event.which);
  if (!/[0-9]\w/.test(ch)) {
    event.preventDefault();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  let phoneRegex = /^09(1[0-9]|3[0-9]|2[012]|9[012])[0-9]{3}[0-9]{4}$/g;
  let regexPhoneCheke = phoneRegex.test(phone.value);
  let emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/g;
  let emailToLowerCase = email.value.toLowerCase();
  let regexemailCheke = emailRegex.test(emailToLowerCase);
  if (regexPhoneCheke === false || regexemailCheke === false) {
    alert("اطلاعات درست وارد شود");
  } else if (imgnumber === false) {
    alert("حتما تصویر اضافه شود");
  } else {
    const userData = {
      name: name.value,
      email: emailToLowerCase,
      phone: phone.value,
      birthday: birthday.value,
      imgSave: reader.result,
    };
    const url = "http://localhost:3000/users";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        alert("اطلاعات کاربر با موفقیت ثبت شد");
        location.href = "DashbordUser.html";
        clearData();
      })
      .catch((error) => console.log(error));
  }
});

function clearData() {
  name.value = "";
  email.value = "";
  phone.value = "";
  birthday.value = "";
  profilePic.src = "img/user.png";
  cardImg.style.boxShadow = ` rgba(255, 115, 115, 0.25) 0px 54px 55px, rgba(255, 125, 125, 0.12) 0px -12px 30px, rgba(255, 109, 109, 0.12) 0px 4px 6px,
  rgba(255, 93, 93, 0.17) 0px 12px 13px, rgba(255, 97, 97, 0.09) 0px -3px 5px`;
  cardImg.style.border = "1px solid rgb(255, 57, 57)";
  btnImg.style.backgroundColor = "#dc3545";
  btnImg.innerHTML = "تصویر اضافه کنید";
}
