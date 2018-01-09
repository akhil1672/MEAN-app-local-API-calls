import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit {

  private students:any;
  constructor(private studentservice:StudentService) { }

  ngOnInit() {
    this.studentservice.getstudents().subscribe(studentsresponse=>{
      this.students=studentsresponse;
      console.log(studentsresponse);
    })
  }

}
