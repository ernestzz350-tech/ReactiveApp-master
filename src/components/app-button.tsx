import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Accent, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  small?: boolean;
};

/** Single button component used everywhere so actions look and behave consistently. */
export function AppButton({ label, onPress, variant = 'primary', small = false }: AppButtonProps) {
  const theme = useTheme();

  const backgroundColor =
    variant === 'primary'
      ? Accent.primary
      : variant === 'danger'
        ? Accent.danger
        : theme.backgroundSelected;
  const textColor = variant === 'secondary' ? theme.text : '#ffffff';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        small && styles.small,
        { backgroundColor },
        pressed && styles.pressed,
      ]}>
      <ThemedText type={small ? 'smallBold' : 'default'} style={{ color: textColor }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three - 4,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two + 2,
  },
  pressed: { opacity: 0.75 },
});
