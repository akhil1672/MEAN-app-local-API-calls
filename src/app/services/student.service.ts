import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const url = "/api/students";
let Students;
@Injectable()
export class StudentService {
  constructor(private http:HttpClient) { }

  getstudents(){
    //const url = "/api/students";
    let students=this.http.get(url);
    Students=students;
    return students;
  }

  addstudent(newstudent){
    const url = "/api/students";
    let headers=new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log("service"+JSON.stringify(newstudent));
    //Students.push(newstudent);
    return this.http.post(url,newstudent,{headers:headers});
  }

  deletestudent(studentid){
    //const url = "/api/students";
    return this.http.delete(url+'/'+studentid);
  }

  updatestudent(updstudent){
    //const url = "/api/students";
    return this.http.put(url+'/'+updstudent._id,updstudent);
  }

}
