export const COURSES = ['Starter', 'Main Course', 'Dessert'] as const;

export type Course = (typeof COURSES)[number];

/** Value used by the course filter when no course is selected. */
export type CourseFilter = Course | 'All';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

/** The editable fields of a menu item (everything except the id). */
export type MenuItemInput = Omit<MenuItem, 'id'>;

export type Notice = {
  type: 'success' | 'error';
  message: string;
};
