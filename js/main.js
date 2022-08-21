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


