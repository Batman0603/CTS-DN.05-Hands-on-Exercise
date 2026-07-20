import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course.service';
import { Notification } from '../../components/notification/notification';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({

  selector:'app-home',

  standalone:true,

  imports: [

  CommonModule,

  FormsModule,

  CourseSummaryWidget,

  Notification

],

  templateUrl:'./home.html',

  styleUrl:'./home.css'

})

export class Home implements OnInit{

  portalName='Student Course Portal';

  isPortalActive=true;

  message='';

  searchTerm='';

  coursesCount=0;

  constructor(private courseService:CourseService){}

  ngOnInit(): void{

    this.courseService.getCourses().subscribe({

  next:(courses)=>{

    this.coursesCount = courses.length;

  }

});

    console.log("HomeComponent initialised — courses loaded");

  }

  onEnrollClick(){

    this.message="Enrollment opened!";

  }

}