import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Accent, Spacing } from '@/constants/theme';
import { useMenu } from '@/context/menu-context';

/** Shows the latest success/error message from the menu store. Tap to dismiss. */
export function NoticeBanner() {
  const { notice, dismissNotice } = useMenu();
  if (!notice) return null;

  const isSuccess = notice.type === 'success';

  return (
    <Pressable
      accessibilityRole="alert"
      onPress={dismissNotice}
      style={[
        styles.banner,
        {
          backgroundColor: isSuccess ? Accent.successBackground : Accent.dangerBackground,
          borderColor: isSuccess ? Accent.success : Accent.danger,
        },
      ]}>
      <ThemedText type="small" style={{ color: isSuccess ? Accent.success : Accent.danger }}>
        {notice.message}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
});
