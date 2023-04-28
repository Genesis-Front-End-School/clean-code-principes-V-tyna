export interface Course {
  id: string,
  title: string,
  tags: string[],
  launchDate: Date | string,
  status: string,
  description: string,
  duration: number,
  lessonsCount: number,
  containsLockedLessons: boolean,
  previewImageLink: string,
  rating: number,
  meta: CourseMetaData
}

export interface CourseMetaData {
  slug: string,
  skills: string[],
  courseVideoPreview: {
    link: string,
    duration: number,
    previewImageLink: string,
  }
}

export interface CourseResponse {
  courses: Course[];
  allCoursesLength: string
}
