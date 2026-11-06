import { COURSES, type Course, type CourseFilter, type MenuItem } from '@/types/menu';

export type MenuStats = {
  totalItems: number;
  averagePrice: number;
  itemsPerCourse: Record<Course, number>;
};

export type FormErrors = {
  name?: string;
  description?: string;
  course?: string;
  price?: string;
};

export const MAX_NAME_LENGTH = 50;
export const MAX_DESCRIPTION_LENGTH = 200;

/** Formats a number as a rand amount, e.g. 85 -> "R85.00". */
export function formatPrice(value: number): string {
  return `R${value.toFixed(2)}`;
}

/** Returns the items whose name contains the query and that match the course filter. */
export function filterMenuItems(
  items: MenuItem[],
  searchQuery: string,
  courseFilter: CourseFilter,
): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName = query === '' || item.name.toLowerCase().includes(query);
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
    return matchesName && matchesCourse;
  });
}

/** Total items, average price and the number of items in each course. */
export function calculateStats(items: MenuItem[]): MenuStats {
  const itemsPerCourse = COURSES.reduce(
    (counts, course) => ({ ...counts, [course]: 0 }),
    {} as Record<Course, number>,
  );
  let priceTotal = 0;

  for (const item of items) {
    itemsPerCourse[item.course] += 1;
    priceTotal += item.price;
  }

  return {
    totalItems: items.length,
    averagePrice: items.length === 0 ? 0 : priceTotal / items.length,
    itemsPerCourse,
  };
}

/** Parses the price text, accepting a comma as the decimal separator. Returns NaN if invalid. */
export function parsePrice(text: string): number {
  const cleaned = text.trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return NaN;
  return Number(cleaned);
}

/** Validates the form fields and returns an error message for each invalid field. */
export function validateMenuForm(
  name: string,
  description: string,
  course: Course | null,
  priceText: string,
): FormErrors {
  const errors: FormErrors = {};

  if (name.trim() === '') {
    errors.name = 'Please enter the dish name.';
  } else if (name.trim().length > MAX_NAME_LENGTH) {
    errors.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }

  if (description.trim() === '') {
    errors.description = 'Please enter a short description.';
  } else if (description.trim().length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
  }

  if (course === null) {
    errors.course = 'Please select a course.';
  }

  if (priceText.trim() === '') {
    errors.price = 'Please enter a price.';
  } else {
    const price = parsePrice(priceText);
    if (Number.isNaN(price)) {
      errors.price = 'Enter a valid price, e.g. 85 or 85.50.';
    } else if (price <= 0) {
      errors.price = 'Price must be greater than zero.';
    }
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
