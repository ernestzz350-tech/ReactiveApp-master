import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { StatCard } from '@/components/stat-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useMenu } from '@/context/menu-context';
import { COURSES } from '@/types/menu';
import { calculateStats, formatPrice } from '@/utils/menu-utils';

export default function StatsScreen() {
  const { items } = useMenu();
  const stats = calculateStats(items);

  return (
    <ScreenContainer>
      <ThemedText type="subtitle">Menu Statistics</ThemedText>

      <View style={styles.row}>
        <StatCard label="Total menu items" value={String(stats.totalItems)} />
        <StatCard label="Average price" value={formatPrice(stats.averagePrice)} />
      </View>

      <ThemedText type="default" style={styles.heading}>
        Items per course
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.table}>
        {COURSES.map((course) => (
          <View key={course} style={styles.tableRow}>
            <ThemedText>{course}</ThemedText>
            <ThemedText type="smallBold">{stats.itemsPerCourse[course]}</ThemedText>
          </View>
        ))}
      </ThemedView>

      {stats.totalItems === 0 && (
        <ThemedText themeColor="textSecondary">
          There are no menu items yet, so every statistic is zero.
        </ThemedText>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  heading: { fontWeight: '700', marginTop: Spacing.two },
  table: { borderRadius: Spacing.three, padding: Spacing.three, gap: Spacing.three },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between' },
});
