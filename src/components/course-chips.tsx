import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Accent, Spacing } from '@/constants/theme';
import { COURSES, type Course } from '@/types/menu';

type CourseChipsProps<T extends Course | 'All'> = {
  selected: T | null;
  onSelect: (course: T) => void;
  /** Adds an "All" chip in front of the courses (used for filtering). */
  includeAll?: boolean;
};

/** Row of selectable course chips, reused by the course filter and the add/edit form. */
export function CourseChips<T extends Course | 'All'>({
  selected,
  onSelect,
  includeAll = false,
}: CourseChipsProps<T>) {
  const options = (includeAll ? ['All', ...COURSES] : [...COURSES]) as T[];

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(option)}>
            <ThemedView
              type={isSelected ? undefined : 'backgroundElement'}
              style={[styles.chip, isSelected && { backgroundColor: Accent.primary }]}>
              <ThemedText
                type="smallBold"
                style={isSelected ? { color: '#ffffff' } : undefined}
                themeColor={isSelected ? undefined : 'textSecondary'}>
                {option}
              </ThemedText>
            </ThemedView>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  chip: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.four,
  },
});
