// {
//   "users": []
// }
//-----!imgSave👇
var profilePic = document.getElementById("profile-pic");
var inputFile = document.getElementById("input-file");
let buttonImg = document.querySelector(".button__img");
var reader = new FileReader();
inputFile.addEventListener("change", () => {
  let file = inputFile.files[0];
  if (file == null) {
    alert("عکسی وارد نشد");
  } else {
    var imgSave = URL.createObjectURL(file);
    profilePic.src = imgSave;
    reader.addEventListener("load", () => {
      reader.result;
      // reader.abort()
      // reader.result = "";
    });
    profilePic.style.border = "3px solid #16FF00";
    buttonImg.style.backgroundColor = "rgb(23 58 20)";
    buttonImg.innerHTML = `عکس جدید ویرایش شد  <i style="color: #16FF00; id="Edite-img-Icon" class="Edite-lable bi bi-exclamation-octagon-fill"></i>`;
    reader.readAsDataURL(file);
    // +
  }
});
//-----!imgSave☝
const usersContainer = document.querySelector("#wrap-users");
const boxDeleteModal = document.querySelector("#delete-modal");
const editModal = document.querySelector("#edit-modal");

const boxBtnCloseModal = document.querySelector("#boxBtnCloseModal");
const boxBtnDleteUser = document.querySelector("#boxBtnDleteUser");

const EditeName = document.querySelector(".EditeName");
const EditeEmail = document.querySelector(".EditeEmail");
const EditePhone = document.querySelector(".EditePhone");
const EditeBirthday = document.querySelector(".EditeBirthday");

//==================Edite( icon-Border )
let boxEditeName = document.getElementById("boxEditeName");
let boxEditeEmail = document.getElementById("boxEditeEmail");
let boxEditePhone = document.getElementById("boxEditePhone");
let boxEditeDate = document.getElementById("boxEditeDate");

let editeNameIcon = document.getElementById("Edite-Name-Icon");
let editeEmailIcon = document.getElementById("Edite-Email-Icon");
let editeTelIcone = document.getElementById("Edite-Tel-Icone");
let editeDateIcone = document.getElementById("Edite-Date-Icone");

const InputSerchServer = document.getElementById("Input-Serch-Server");

//==================Edite( icon-Border )

//################👇(modal-close-Edite)
let modalClose = document.querySelector(".modal-close");
modalClose.addEventListener("click", () => {
  editModal.classList.remove("visible");
  boxEditeName.style.border = "1px solid #c7ce00";
  boxEditeEmail.style.border = "1px solid #c7ce00";
  boxEditePhone.style.border = "1px solid #c7ce00";
  boxEditeDate.style.border = "1px solid #c7ce00";

  editeNameIcon.style.color = "#c7ce00";
  editeEmailIcon.style.color = "#c7ce00";
  editeTelIcone.style.color = "#c7ce00";
  editeDateIcone.style.color = "#c7ce00";
});
//################☝(modal-close-Edite)

let userID = null;
let option = {
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
kamaDatepicker("test-date-id", option);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

EditeName.addEventListener("keyup", () => {
  if (EditeName.value.length === 0) {
    boxEditeName.style.border = "1px solid #b0002d";
    editeNameIcon.style.color = "#b0002d";
  } else {
    boxEditeName.style.border = "1px solid #16FF00";
    editeNameIcon.style.color = "#16FF00";
  }
});
EditePhone.addEventListener("keypress", (event) => {
  var ch = String.fromCharCode(event.which);
  if (!/[0-9]/.test(ch)) {
    event.preventDefault();
  }
});
EditeBirthday.addEventListener("keypress", (event) => {
  var ch = String.fromCharCode(event.which);
  if (!/[0-9]\w/.test(ch)) {
    event.preventDefault();
  }
});
EditeEmail.addEventListener("keyup", () => {
  let searchEmailValue = EditeEmail.value.includes("@gmail.com");
  if (searchEmailValue === true) {
    boxEditeEmail.style.border = "1px solid #16FF00";
    editeEmailIcon.style.color = "#16FF00";
  } else {
    boxEditeEmail.style.border = "1px solid #b0002d";
    editeEmailIcon.style.color = "#b0002d";
  }
});
EditePhone.addEventListener("keyup", () => {
  if (EditePhone.value.length === 11) {
    boxEditePhone.style.border = "1px solid #16FF00";
    editeTelIcone.style.color = "#16FF00";
  } else {
    boxEditePhone.style.border = "1px solid #b0002d";
    editeTelIcone.style.color = "#b0002d";
  }
});
EditeBirthday.addEventListener("focusin", () => {
  boxEditeDate.style.border = "1px solid #b0002d";
  editeDateIcone.style.color = "#b0002d";
  EditeBirthday.value = "";
});
EditeBirthday.addEventListener("focusout", () => {
  if (!EditeBirthday.value == "") {
    boxEditeDate.style.border = "1px solid #16FF00";
    editeDateIcone.style.color = "#16FF00";
  }
});
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^fetch(Serch)👇

InputSerchServer.addEventListener("keyup", userSearch);
function userSearch() {
  const urlAPI = `http://localhost:3000/users?q=${InputSerchServer.value.trim()}`;
  fetch(urlAPI)
    .then((resposeAPI) => resposeAPI.json())
    .then((dataAPI) => {
      const objConvercionArray = Object.entries(dataAPI);
      usersContainer.innerHTML = "";
      for (const keyDataArray of objConvercionArray) {
        usersContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="user">
              <div class="user-profile-wrap">
                  <img class="user-profile" src="${keyDataArray[1].imgSave}" alt="default-image">
                  <div class="user-profile-description">
                      <h1 class="user-profile-name">نام کاربری : ${keyDataArray[1].name} - ${keyDataArray[1].id}</h1>
                      <h2 class="user-profile-name">ایمیل کاربر : ${keyDataArray[1].email}</h2>
                      <h3 class="user-explanations"> تلفن کاربر: ${keyDataArray[1].phone}</h3>
                      <h3 class="user-explanations">تاریخ تولد کاربر: ${keyDataArray[1].birthday}</h3>
                  </div>
              </div>
              <div class="btn-groups-column">
                  <button class="delete-user-btn" onclick="buttonModalContainer(${keyDataArray[1].id})">حذف کاربر</button>
                  <button class="edit-user-btn" onclick="openEditModal(${keyDataArray[1].id})">ویرایش کاربر</button>
              </div>
               `
        );
      }
    });
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^fetch(Serch)👆

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$fetch(get)👇

window.addEventListener("load", getAllUserApi);
function getAllUserApi() {
  InputSerchServer.focus();
  const urlAPI = "http://localhost:3000/users";
  fetch(urlAPI)
    .then((resposeAPI) => resposeAPI.json())
    .then((dataAPI) => {
      const objConvercionArray = Object.entries(dataAPI);
      usersContainer.innerHTML = "";
      for (const keyDataArray of objConvercionArray) {
        usersContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="user">
              <div class="user-profile-wrap">
                  <img class="user-profile" src="${keyDataArray[1].imgSave}" alt="default-image">
                  <div class="user-profile-description">
                      <h1 class="user-profile-name">نام کاربری : ${keyDataArray[1].name} - ${keyDataArray[1].id}</h1>
                      <h2 class="user-profile-name">ایمیل کاربر : ${keyDataArray[1].email}</h2>
                      <h3 class="user-explanations"> تلفن کاربر: ${keyDataArray[1].phone}</h3>
                      <h3 class="user-explanations">تاریخ تولد کاربر: ${keyDataArray[1].birthday}</h3>
                  </div>
              </div>
              <div class="btn-groups-column">
                  <button class="delete-user-btn" onclick="buttonModalContainer(${keyDataArray[1].id})">حذف کاربر</button>
                  <button class="edit-user-btn" onclick="openEditModal(${keyDataArray[1].id})">ویرایش کاربر</button>
              </div>
               `
        );
      }
    });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!fetch(DELETE)👇
function buttonModalContainer(id) {
  userID = id;
  boxDeleteModal.classList.add("visible");
}

function eventBoxBtnCloseModal() {
  boxDeleteModal.classList.remove("visible");
}

async function eventBoxBtnDleteUser() {
  const urlDeleteApi = `http://localhost:3000/users/${userID}`;
  await fetch(urlDeleteApi, {
    method: "DELETE",
  })
    .then((responsDeleteApi) => {
      eventBoxBtnCloseModal();
      getAllUserApi();
    })
    .catch((errDeleteApi) => errDeleteApi);
}

boxBtnCloseModal.addEventListener("click", eventBoxBtnCloseModal);
boxBtnDleteUser.addEventListener("click", eventBoxBtnDleteUser);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fetch(PUT)👇

function openEditModal(id) {
  userID = id;
  editModal.classList.add("visible");
  //+
  const urlAPI = `http://localhost:3000/users/${userID}`;
  fetch(urlAPI)
    .then((resposeAPI) => resposeAPI.json())
    .then((dataAPI) => {
      EditeName.value = dataAPI.name;
      EditeEmail.value = dataAPI.email;
      EditePhone.value = dataAPI.phone;
      EditeBirthday.value = dataAPI.birthday;
      profilePic.src = dataAPI.imgSave;
    });
  //+
  boxEditeName.style.border = "1px solid #c7ce00";
  boxEditeEmail.style.border = "1px solid #c7ce00";
  boxEditePhone.style.border = "1px solid #c7ce00";
  boxEditeDate.style.border = "1px solid #c7ce00";
  editeNameIcon.style.color = "#c7ce00";
  editeEmailIcon.style.color = "#c7ce00";
  editeTelIcone.style.color = "#c7ce00";
  editeDateIcone.style.color = "#c7ce00";
  profilePic.style.border = "3px solid #c7ce00";
  buttonImg.style.backgroundColor = "#b0002d";
  buttonImg.innerHTML = `عکس جدید <i style="color: #c7ce00; id="Edite-img-Icon" class="Edite-lable bi bi-exclamation-octagon-fill"></i>`;
  // reader.result = "";
  // reader.abort();
}

function closeEditModal() {
  editModal.classList.remove("visible");
}
function updateUser() {
  let phoneRegex = /^09(1[0-9]|3[0-9]|2[012]|9[012])[0-9]{3}[0-9]{4}$/g;
  let regexPhoneChekeEdite = phoneRegex.test(EditePhone.value);

  let emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/g;
  let regexemailChekeEdite = emailRegex.test(EditeEmail.value);

  if (
    regexPhoneChekeEdite === false ||
    regexemailChekeEdite === false ||
    EditeBirthday.value === "" ||
    EditeName.value.trim() === ""
  ) {
    if (EditeName.value.trim() === "") {
      boxEditeName.style.border = "1px solid #b0002d";
      editeNameIcon.style.color = "#b0002d";
    }
    if (regexemailChekeEdite === false) {
      boxEditeEmail.style.border = "1px solid #b0002d";
      editeEmailIcon.style.color = "#b0002d";
    }
    if (regexPhoneChekeEdite === false) {
      boxEditePhone.style.border = "1px solid #b0002d";
      editeTelIcone.style.color = "#b0002d";
    }
    if (EditeBirthday.value === "") {
      boxEditeDate.style.border = "1px solid #b0002d";
      editeDateIcone.style.color = "#b0002d";
    }
  } else {
    //+++++++++++++++
    // debugger;
    const urlAPI = `http://localhost:3000/users/${userID}`;
    fetch(urlAPI)
      .then((resposeAPI) => resposeAPI.json())
      .then((dataAPI) => {
        let URLImageUser = dataAPI.imgSave;
        const userNewData = {
          name: EditeName.value,
          email: EditeEmail.value,
          phone: EditePhone.value,
          birthday: EditeBirthday.value,
          imgSave: reader.result || URLImageUser,
        };
        fetch(`http://localhost:3000/users/${userID}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userNewData),
        }).then((res) => {
          closeEditModal();
          getAllUserApi();
          window.location.reload();
        });
      });
    //+++++++++++++++
  }
}
