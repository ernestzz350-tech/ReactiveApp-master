import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { MenuItem } from '@/types/menu';
import { formatPrice } from '@/utils/menu-utils';

type MenuItemCardProps = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
};

export function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="default" style={styles.name}>
          {item.name}
        </ThemedText>
        <ThemedText type="default">{formatPrice(item.price)}</ThemedText>
      </View>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {item.course}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {item.description}
      </ThemedText>
      <View style={styles.actions}>
        <AppButton small variant="secondary" label="Edit" onPress={() => onEdit(item)} />
        <AppButton small variant="danger" label="Delete" onPress={() => onDelete(item)} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: Spacing.three, padding: Spacing.three, gap: Spacing.one },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.two },
  name: { flex: 1, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.two },
});
