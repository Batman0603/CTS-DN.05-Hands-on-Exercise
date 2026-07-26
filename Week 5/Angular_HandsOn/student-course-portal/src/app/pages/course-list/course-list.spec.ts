import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

interface TestState {
  course: {
    courses: Course[];
    loading: boolean;
    error: string | null;
  };
  enrollment: {
    enrolledCourseIds: number[];
    selectedCourseId: number | null;
    students: unknown[];
    loadingStudents: boolean;
    error: string | null;
  };
}

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore<TestState>;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG-101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Reactive Forms', code: 'ANG-201', credits: 4, gradeStatus: 'pending' }
  ];

  const initialState: TestState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: [],
      selectedCourseId: null,
      students: [],
      loadingStudents: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  it('should render course cards from initial state', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  it('should show loading indicator when the store is loading', () => {
    store.setState({
      ...initialState,
      course: {
        ...initialState.course,
        courses: [],
        loading: true,
        error: null
      }
    });

    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.loading-container'));
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.nativeElement.textContent).toContain('Loading Courses...');
  });
});
