import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [

        '',

        [
          Validators.required,
          Validators.minLength(3)
        ]

      ],

      studentEmail: this.fb.control(

        '',

        [
          Validators.required,
          Validators.email
        ],

        [
          this.simulateEmailCheck
        ]

      ),

      courseId: [

        '',

        [
          Validators.required,
          this.noCourseCode
        ]

      ],

      preferredSemester: [

        'Odd',

        Validators.required

      ],

      agreeToTerms: [

        false,

        Validators.requiredTrue

      ],

      additionalCourses: this.fb.array([])

    });

  }

  /*
    Custom Validator

    Rejects values beginning with XX
  */

  noCourseCode(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if(value && value.startsWith('XX')){

      return {

        noCourseCode:true

      };

    }

    return null;

  }

  /*
    Async Validator

    Rejects emails containing test@
  */

  simulateEmailCheck(control: AbstractControl){

    return new Promise<ValidationErrors | null>((resolve)=>{

      setTimeout(()=>{

        if(control.value && control.value.includes('test@')){

          resolve({

            emailTaken:true

          });

        }

        else{

          resolve(null);

        }

      },800);

    });

  }

  /*
    Getter

    Better than casting inside HTML.
    Keeps the template clean.
  */

  get additionalCourses(): FormArray<FormControl<string | null>> {
  return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string | null>>;
}

  addCourse(){

    this.additionalCourses.push(

      new FormControl(

        '',

        Validators.required

      )

    );

  }

  removeCourse(index:number){

    this.additionalCourses.removeAt(index);

  }

  onSubmit(){

    console.log("Form Value");

    console.log(this.enrollForm.value);

    console.log("Raw Value");

    console.log(this.enrollForm.getRawValue());

  }

}