import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; boundary=xxxxBoundaryStringxxxx' })
};

@Injectable()
export class RestProvider {

  baseUrlLive: string = "";
  baseUrlUAT: string = "http://192.168.43.247:8080/attendance/";
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getMessage() {
    var response = this.http.get(this.baseUrlUAT + 'readAttendance.php?value=GetNotices');
    return response;
  }

  loginAuthentication(data, imei) {
    let postData = {
      "emp_id": data.username,
      "password": data.password,
      "imei_no": imei
    }
    console.log(postData);
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=LoginAuthentication', postData, httpOptions);
    console.log(response);
    return response;
  }

  viewHolidayList(data) {
    let postData = {
      "location": data.location,
      "year": data.year
    }
    console.log(postData);
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=ViewHolidayList', postData, httpOptions);
    console.log(response);
    return response;
  }

  ViewPaySleep(emp_id, data) {
    let postData = {
      "emp_id": emp_id,
      "month": data.month,
      "year": data.year
    }
    console.log(postData);
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=ViewpaySleep', postData, httpOptions);
    console.log(response);
    return response;
  }

  updateProfile(type, data, emp_id) {

    if (type == "address") {
      let postData = {

        "type": type,
        "emp_id": emp_id,
        "street_address": data.street_address,
        "city": data.city,
        "state": data.state,
        "country": data.country,
        "pincode": data.pincode,
        "mobile_no": ""
      }
      console.log(postData);
      var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=UpdateProfile', postData, httpOptions);
      console.log(response);
      return response;
    }

    else {
      let postData = {

        "type": type,
        "emp_id": emp_id,
        "street_address": "",
        "city": "",
        "state": "",
        "country": "",
        "pincode": "",
        "mobile_no": data.mobile_no
      }
      console.log(postData);
      var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=UpdateProfile', postData, httpOptions);
      console.log(response);
      return response;
    }
  }

  insertLeaves(data, start_date, end_date, in_lieu_date, comp_off_date, emp_id) {
    let postData = {
      "leave_type": data.leave_type,
      "emp_id": emp_id,
      "start_date": start_date,
      "end_date": end_date,
      "in_lieu_date": in_lieu_date,
      "comp_off_date": comp_off_date,
      "reason": data.reason,
      "leave_desc": data.leave_desc
    }
    console.log(postData);
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=AddLeaves', postData, httpOptions);
    console.log(response);
    return response;
  }

  addAttendance(emp_id) {
    let postData = {
      "emp_id": emp_id
    }
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=AddAttendance', postData, httpOptions);
    console.log(response);
    return response;
  }

  viewAttendanceDetails(emp_id) {
    let postData = {
      "emp_id": emp_id
    }
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=ViewAttendance', postData, httpOptions);
    console.log(response);
    return response;
  }

  viewLeaveDetails(emp_id) {
    let postData = {
      "emp_id": emp_id
    }
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=ViewLeaveDetails', postData, httpOptions);
    console.log(response);
    return response;
  }

  viewLeaveCount(emp_id) {
    let postData = {
      "emp_id": emp_id
    }
    var response = this.http.post(this.baseUrlUAT + 'readAttendance.php?value=LeaveCount', postData, httpOptions);
    console.log(response);
    return response;
  }
}
