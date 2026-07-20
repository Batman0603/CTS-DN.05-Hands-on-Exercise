import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { CourseCard } from '../../components/course-card/course-card';

import { CourseService } from '../../services/course.service';

import { Course } from '../../models/course.model';

@Component({

  selector:'app-course-list',

  standalone:true,

  imports:[
    CommonModule,
    CourseCard
  ],

  templateUrl:'./course-list.html',

  styleUrl:'./course-list.css'

})

export class CourseList implements OnInit{

  isLoading=true;

  courses:Course[]=[];

  constructor(

    private courseService:CourseService,

    private router:Router

  ){}

  ngOnInit():void{

    setTimeout(()=>{

      this.courses=this.courseService.getCourses();

      this.isLoading=false;

    },1500);

  }

  trackByCourseId(index:number,course:Course){

      return course.id;

  }

  openCourse(id:number){

      this.router.navigate(['courses',id]);

  }

}