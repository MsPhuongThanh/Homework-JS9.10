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
function dom(selector){
    return document.querySelector(selector);

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
// Hàm init sẽ được thực thi khi chương trình được khởi chạy 
init();
function init(){
    staffs = JSON.parse(localStorage.getItem("staffs))||[];
    staffs = staff.map((staff) =>{
    return new Staff(
        staff.account,
        staff.name,
        staff.email,
        staff.password,
        staff.workingdate,
        staff.salary,
        staff.position,
        staff.workinghours
    });
        console.log("Staff sau khi map:", staffs);
        display(staffs);
    }
                                             
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

//B2:  Tạo object chứa các thông tin trên
let staff = new Staff(account, name, email, password, workingdate, salary, position, workinghours);
console.log(staff);
//B3: thêm object staff vào array staffs
staffs.push[staff];
//B4: Hiển thị array ra giao diện 
display(staffs)
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
        </tr>
        `
    }
    dom("#tableDanhSach").innerHTML =html;
}

}



