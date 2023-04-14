type Status = 'locked' | 'unlocked';

export interface Lesson {
  id: string,
  title: string,
  duration: number,
  order: number,
  type: string,
  status: Status,
  link: string,
  previewImageLink: string,
  meta: null
};

export interface CourseDetail {
  id: string,
  title: string,
  tags: string[],
  launchDate: Date | string,
  status: string,
  description: string,
  duration: number,
  previewImageLink: string,
  rating: number,
  meta: {
    slug: string,
    skills: string[],
    courseVideoPreview?: {
      link: string,
      duration: number,
      previewImageLink: string,
    }
  },
  lessons: Lesson[],
  containsLockedLessons: boolean
}
