import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import { AppButton } from '@/components/app-button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { CourseChips } from '@/components/course-chips';
import { MenuItemCard } from '@/components/menu-item-card';
import { NoticeBanner } from '@/components/notice-banner';
import { ScreenContainer } from '@/components/screen-container';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { useMenu } from '@/context/menu-context';
import type { CourseFilter, MenuItem } from '@/types/menu';
import { filterMenuItems } from '@/utils/menu-utils';

export default function MenuScreen() {
  const router = useRouter();
  const { items, deleteItem } = useMenu();

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('All');
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  const visibleItems = useMemo(
    () => filterMenuItems(items, searchQuery, courseFilter),
    [items, searchQuery, courseFilter],
  );
  const isFiltering = searchQuery.trim() !== '' || courseFilter !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setCourseFilter('All');
  };

  const handleEdit = (item: MenuItem) => {
    router.push({ pathname: '/add', params: { id: item.id } });
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) deleteItem(itemToDelete.id);
    setItemToDelete(null);
  };

  return (
    <ScreenContainer>
      <ThemedText type="subtitle">Chef&apos;s Menu</ThemedText>

      <NoticeBanner />

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <CourseChips<CourseFilter> includeAll selected={courseFilter} onSelect={setCourseFilter} />

      <ThemedText type="small" themeColor="textSecondary">
        Showing {visibleItems.length} of {items.length} menu items
      </ThemedText>

      {isFiltering && <AppButton small variant="secondary" label="Clear search & filter" onPress={clearFilters} />}

      {visibleItems.length === 0 ? (
        <ThemedText themeColor="textSecondary">
          {items.length === 0
            ? 'Your menu is empty. Use the Add tab to create your first item.'
            : 'No menu items match your search. Try a different name or clear the filter.'}
        </ThemedText>
      ) : (
        visibleItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onEdit={handleEdit} onDelete={setItemToDelete} />
        ))
      )}

      <ConfirmDialog
        visible={itemToDelete !== null}
        title="Delete menu item?"
        message={`"${itemToDelete?.name ?? ''}" will be permanently removed from the menu.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </ScreenContainer>
  );
}
