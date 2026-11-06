import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Accent, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

/** Labelled text input with inline validation message. */
export function FormField({ label, error, style, ...inputProps }: FormFieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedView
        type="backgroundElement"
        style={[styles.inputBox, error ? { borderColor: Accent.danger } : null]}>
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text }, style]}
          {...inputProps}
        />
      </ThemedView>
      {error ? (
        <ThemedText type="small" style={{ color: Accent.danger }}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.one },
  inputBox: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.three,
  },
  input: { fontSize: 16, paddingVertical: Spacing.three - 4 },
});
