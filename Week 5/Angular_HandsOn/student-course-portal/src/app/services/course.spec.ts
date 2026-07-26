import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG-101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Reactive Forms', code: 'ANG-201', credits: 4, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load courses from the correct URL', fakeAsync(() => {
    let courses: Course[] | undefined;

    service.getCourses().subscribe(result => {
      courses = result;
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);

    tick(2000);

    expect(courses).toBeTruthy();
    expect(courses?.length).toBe(2);
  }));

  it('should emit an error message when the request fails', fakeAsync(() => {
    let errorResponse: Error | undefined;

    service.getCourses().subscribe({
      next: () => fail('Expected an error response'),
      error: error => {
        errorResponse = error;
      }
    });

    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush({}, { status: 500, statusText: 'Server Error' });

    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush({}, { status: 500, statusText: 'Server Error' });

    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush({}, { status: 500, statusText: 'Server Error' });

    tick();

    expect(errorResponse).toBeTruthy();
    expect(errorResponse?.message).toBe('Failed to load courses. Please try again.');
  }));
});
