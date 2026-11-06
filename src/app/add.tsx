import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { CourseChips } from '@/components/course-chips';
import { FormField } from '@/components/form-field';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Accent, Spacing } from '@/constants/theme';
import { useMenu } from '@/context/menu-context';
import type { Course } from '@/types/menu';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  hasErrors,
  parsePrice,
  validateMenuForm,
  type FormErrors,
} from '@/utils/menu-utils';

/** Add a new menu item, or edit an existing one when an `id` route param is supplied. */
export default function AddEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addItem, updateItem, getItem } = useMenu();

  const editingItem = id ? getItem(id) : undefined;
  const isEditing = editingItem !== undefined;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | null>(null);
  const [priceText, setPriceText] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setCourse(null);
    setPriceText('');
    setErrors({});
  }, []);

  // Load the item being edited (or a blank form) every time this tab is shown.
  useFocusEffect(
    useCallback(() => {
      if (editingItem) {
        setName(editingItem.name);
        setDescription(editingItem.description);
        setCourse(editingItem.course);
        setPriceText(String(editingItem.price));
        setErrors({});
      } else {
        resetForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]),
  );

  const finish = () => {
    resetForm();
    router.setParams({ id: undefined });
    router.navigate('/');
  };

  const handleSave = () => {
    const validation = validateMenuForm(name, description, course, priceText);
    setErrors(validation);
    if (hasErrors(validation) || course === null) return;

    const input = {
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsePrice(priceText),
    };

    if (editingItem) {
      updateItem(editingItem.id, input);
    } else {
      addItem(input);
    }
    finish();
  };

  return (
    <ScreenContainer>
      <ThemedText type="subtitle">{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</ThemedText>

      <FormField
        label="Dish name"
        value={name}
        onChangeText={setName}
        placeholder="e.g. Grilled Beef Fillet"
        maxLength={MAX_NAME_LENGTH}
        error={errors.name}
      />

      <FormField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Short description of the dish"
        multiline
        maxLength={MAX_DESCRIPTION_LENGTH}
        style={{ minHeight: 80, textAlignVertical: 'top' }}
        error={errors.description}
      />

      <View style={{ gap: Spacing.one }}>
        <ThemedText type="smallBold">Course</ThemedText>
        <CourseChips<Course> selected={course} onSelect={setCourse} />
        {errors.course ? (
          <ThemedText type="small" style={{ color: Accent.danger }}>
            {errors.course}
          </ThemedText>
        ) : null}
      </View>

      <FormField
        label="Price (R)"
        value={priceText}
        onChangeText={setPriceText}
        placeholder="e.g. 85.50"
        keyboardType="decimal-pad"
        error={errors.price}
      />

      <AppButton label={isEditing ? 'Save Changes' : 'Add to Menu'} onPress={handleSave} />
      {isEditing && <AppButton variant="secondary" label="Cancel" onPress={finish} />}
    </ScreenContainer>
  );
}
