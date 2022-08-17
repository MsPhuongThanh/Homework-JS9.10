//1. In ra table danh sách nhân viên = tạo lớp đối tượng nhân viên
function staff(_account,_name, _email, _password,_workingdate,_salary,_position,_workinghours)
{this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.workingdate = _workingdate;
    this.salary = _salary;
    this.position = _position;
    this.workinghours = _workinghours;
    this.
}

// DOM tới nhiều phần tử 
function domAll(selector) {
    return document.querySelectorAll(selector)
}
// Tạo array staff để lưu danh sách nhân viên
let staffs =[];
init();
function init(){
    staffs = JSON.parse(localStorage.getItem("staffs"))||[];
    staffs = staffs.map((staff)=>{
        return new staff(
            staff.account,
            staff.name,
            staff.email,
            staff.password,
            staff.workingdate,
            staff.salary,
            staff.position,
            staff.workinghours
        );
    });
    console.log(" danh sách staff: ", staffs);
    display(staffs);
}
// 2. Thêm nhân viên mới 
function addStaff(){

}