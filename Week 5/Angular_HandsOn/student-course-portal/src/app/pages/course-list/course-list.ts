import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  courses = [

    {
      id:1,
      name:'Angular',
      code:'ANG101',
      credits:4
    },

    {
      id:2,
      name:'React',
      code:'REA201',
      credits:3
    },

    {
      id:3,
      name:'Java',
      code:'JAVA301',
      credits:4
    }

  ];

}