//1. In ra table danh sách nhân viên
function Staff(account, name, email, password, workingdate, salary, position, workinghours){
this.account = account;
this.name = name;
this.email = email;
this.password = password;
this.workingdate = workingdate;
this.salary =  salary;
this.position = position;
this.workinghours = workinghours;
}

// Hàm tính tổng lương
Staff.prototype.calcScore = function(){
    let currentFormat = new Intl.NumberFormat("vn-VN");
    if (this.position == "Sếp"){
        return currentFormat.format(this.salary *3);
    }else if (this.position == "Trưởng phòng"){
        return currentFormat.format(this.salary *2);
    }else if (this.postition == "Nhân viên"){
        return currentFormat.format (this.salary *1);
    } 
};
// Hàm xếp loại chức vụ 
Staff.prototype.getRank = function(){
    if (this.workinghours >=192){
        return "Nhân Viên Xuất Sắc";
    }else if (this.workinghours >=176){
        return "Nhân Viên Giỏi";
    }else if (this.workinghours >=160){
        return " Nhân Viên Khá";
    }else{
        return " Nhân Viên Trung Bình";
}
};

// Tạo array staffs để lưu trữ danh sách staff
let staffs = [];
function addStaff(){
    //B1: DOM lấy thông tin từ các input
let account = dom("#tknv").value;
let name = dom("#name").value;
let email = dom("#email").value;
let password = dom("#password").value;
let workingdate = dom("#datepicker").value;
let salary = +dom("#luongCB").value;
let position = dom ("#chucvu").value;
let workinghours = +dom ("#gioLam").value;

let isValid = validateForm();
// kiểm tra hợp lệ
if (isValid){
    return;
}

//B2:  Tạo object chứa các thông tin trên
let staff = new Staff(account, name, email, password, workingdate, salary, position, workinghours);
console.log(staff);
//B3: thêm object staff vào array staffs
staffs.push[staff];
//B4: Hiển thị array ra giao diện 
display(staffs);

// Dùng array này để hiển thị thông tin staff ra table 
function display(staffs){
    let html ="";
    for (let i=0; i<staffs.length;i++){
        let staff = staffs[i];
        html += `
        <tr>
        <td>${staff.account}</td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>
        <td>${staff.workingdate}</td>
        <td>${staff.salary}</td>
        <td>${staff.position}</td>
        <td>${staff.calcScore()}</td>
        <td>${staff.getRank()}</td>
        <td>
        <button 
        class="btn btn-danger"
        onclick="deleteStaff(${staff.account})"
        >Delete</button>
        </td>
        <td>
        <button class="btn btn-warning" 
        data-toggle="modal"
        data-target="#myModal" onclick="selectStaff("${staff.account}")>
        Edit
        
        </button>
        </td>
        </tr>
        `
    }
    // DOM ra thẻ tbody
    dom("#tableDanhSach").innerHTML =html;
}
// Cập nhật thông tin nhân viên 
function updateStaff(){
    let account = dom("#tknv").value;
    let name = dom("#name").value;
    let email = dom("#email").value;
    let password = dom("#password").value;
    let workingdate = dom("#datepicker").value;
    let salary = +dom("#luongCB").value;
    let position = dom ("#chucvu").value;
    let workinghours = +dom ("#gioLam").value; 
    
    let isValid = validateName()&
    validateEmail()&
    validatePassword()&
    validateWorkingdate()&
    validatePosition()&
    validateWorkinghours()
    if (!isValid){
        return;
    }
    let staff = new Staff(account, name, email, password, workingdate, salary, position, workinghours);
      let index = staffs.findIndex((value)=>value.account === staff.account);
      staffs[index] = staff;
      
      localStorage.setItem("staffs", JSON.stringify(staffs));
      display(staffs);
      resetForm();
    
    }
function dom(selector){
    return document.querySelector(selector);

}
// Hàm resetForm dùng để set giá trị của các input về chuỗi rỗng
function resetForm(){
    dom("#tknv").value = "";
    dom("#name").value = "";
    dom("#email").value = "";
    dom("#password").value = "";
    dom("#datepicker").value = "";
    dom("#luongCB").value = 0;
    dom ("#chucvu").value = "";
    dom ("#gioLam").value = 0;

    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
    dom("#btnCapNhat").disabled = false;


}
// Hàm delete 
function deleteStaff(staffAccount){
    //staffAccount là acc của staff muốn xoá khỏi array staffs
    staffs = staffs.filter((staff)=>{
        return staff.account !==staffAccount;
    });
    localStorage.setItem("staffs", JSON.stringify(staffs));
    display(staffs);
}
// Hàm search 
function searchStaff(){
    let searchValue = dom("#searchName").value;

    if (!searchValue){
        display(staffs);
        return;
    }
    searchValue = searchValue.toLowerCase();
    let newStaff = staffs.filter((staff)=>{
        let getRank = staff.getRank().toLowerCase();
        return getRank.includes(searchValue);
    });
    display(newStaff);
}
// Hàm edit 
function selectStaff(staffAccount){
    let staff = staffs.find((staff)=>{
        return staff.account === staffAccount;
    });
    if (!staff){
        return;
    }
    dom("#tknv").value = staff.account;
    dom("#name").value = staff.name;
    dom("#email").value = staff.email;
    dom("#password").value = staff.password;
    dom("#datepicker").value = staff.workingdate;
    dom("#luongCB").value = staff.salary;
    dom("#chucvu").value = staff.position;
    dom("#gioLam").value = staff.workinghours;

    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
    dom("#btnCapNhat").disabled = false;
    }
}
// Validation: Account
function validateId(){
    let account = dom("#tknv").value;
    let spanEl = dom("#tbTKNV");

    if(account.length < 4 || account.length >6){
        spanEl.style.display = "Block";
        spanEl.innerHTML ="Tài khoản có độ dài từ 4 đến 6 ký số";
        return false;
    }

    if(!account){
        spanEl.style.display = "Block";
        spanEl.innerHTML="Tài khoản không để trống";
        return false;
    }
if(!checkaccount(account)){
    return false;
}
spanEl.style.display = "none";
spanEl.innerHTML = "";
return true;
}
// Validation: Name
function validateName() {
    let name = dom("#name").value;
    let spanEl = dom("#tbTen");
  
    if (!name) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Tên không được để trống";
      return false;
    }
    let regex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    if (!regex.test(name)) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Hãy điền dạng chữ !";
      return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;
  }
  //Validation : Email
  function validateEmail() {
    let email = dom("#email").value;
    let spanEl = dom("#tbEmail");
    if (!email) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Email không bỏ trống";
      return false;
    }
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email)) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Email sai định dạng";
      return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;
  }
  //Validation : password
  function validatePassword() {
    let password = dom("#password").value;
    let spanEl = dom("#tbMatKhau");
  
    if (!password) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Mật khẩu không được để trống";
    }
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password) || password.length < 6 || password.length > 10) {
      spanEl.style.display = "Block";
      spanEl.innerHTML =
        "Mật khẩu từ 6 đến 10 kí tự trong đó bao gồm 1 kí tự in hoa, 1 kí tự thường, 1 kí tự số và 1 kí tự đặc biệt";
      return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;
  }
  // Validation : workingdate
  function validateWorkingdate() {
    let datewword = dom("#datepicker").value;
    let spanEl = dom("#tbNgay");
  
    if (!datewword) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Ngày tháng không được để trống";
      return false;
    }
    let regex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (!regex.test(datewword)) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Ngày tháng theo định dạng mm/dd/yyyy";
      return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;
  }
  // Validation: salary
  function validateSalary(){
    let salary = +dom("#luongCB").value;
    let spanEl = dom("#tbLuongCB");
  
    if (!salary) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Lương cơ bản không được để trống";
      return false;
    }
    if (!isNumber(salary) || salary < 1000000 || salary > 20000000) {
      spanEl.style.display = "Block";
      spanEl.innerHTML = "Lương cơ bản từ 1.000.000 đến 20.000.000 Vnd";
      return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;
  }
  // Validation: position
  function validatePosition(){
    let position = dom("#chucvu").value;
  let spanEl = dom("#tbChucVu");

  if (!position) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Chọn chức vụ, không được để trống";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;  
  }
// Validation: workinghours
function validateWorkinghours(){
    let workinghours = dom("#gioLam").value;
  let spanEl = dom("#tbGiolam");

  if (!workinghours) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Giờ làm không được để trống";
    return false;
  }
  if (workinghours < 80 || time > 200) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Số giờ làm trong tháng là 80 - 200 giờ";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

