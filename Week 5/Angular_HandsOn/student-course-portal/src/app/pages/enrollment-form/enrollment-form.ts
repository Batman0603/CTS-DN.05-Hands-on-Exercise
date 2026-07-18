import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({

  selector:'app-enrollment-form',

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./enrollment-form.html',

  styleUrl:'./enrollment-form.css'

})

export class EnrollmentForm {

  studentName='';

  studentEmail='';

  courseId:number|null=null;

  preferredSemester='';

  agreeToTerms=false;

  onSubmit(form:NgForm){

    console.log("Form Value");

    console.log(form.value);

    console.log("Form Valid");

    console.log(form.valid);

  }

}