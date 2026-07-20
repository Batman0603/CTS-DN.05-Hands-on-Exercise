import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';

@Component({

  selector:'app-course-list',

  standalone:true,

 imports:[

    CommonModule,

    FormsModule,

    CourseCard

],

  templateUrl:'./course-list.html',

  styleUrl:'./course-list.css'

})

export class CourseList implements OnInit{

  isLoading=true;

  courses:Course[]=[];

  searchTerm='';

  constructor(

    private courseService:CourseService,

    private router:Router,

    private route:ActivatedRoute

  ){}

  ngOnInit():void{

    this.searchTerm =

      this.route.snapshot.queryParamMap.get('search') || '';

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

  searchCourses(){

      this.router.navigate(

        ['courses'],

        {

          queryParams:{

            search:this.searchTerm

          }

        }

      );

  }

}