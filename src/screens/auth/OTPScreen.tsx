import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@/components';
import { colors } from '@/constants/colors';
import { radius, spacing, typography } from '@/constants/sizes';
import { useAuthStore } from '@/store/authStore';

const LEN = 6;

export default function OTPScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { challengeId, mobile } = route.params ?? {};
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(''));
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const onChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, '').slice(0, 1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < LEN - 1) refs.current[i + 1]?.focus();
  };

  const submit = async () => {
    const code = digits.join('');
    if (code.length !== LEN) return setError('Enter the 6-digit code');
    setLoading(true);
    setError(undefined);
    try {
      await verifyOtp(challengeId ?? 'mock', code);
    } catch (e: any) {
      setError(e?.message ?? 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Verify your mobile</Text>
      <Text style={styles.subtitle}>We sent a 6-digit code to {mobile ?? 'your phone'}</Text>

      <View style={styles.row}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => { refs.current[i] = r; }}
            value={d}
            onChangeText={(v) => onChange(i, v)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.cell}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Verify" onPress={submit} loading={loading} fullWidth />

      <View style={styles.resend}>
        <Text style={styles.muted}>Didn{'\u2019'}t receive the code?</Text>
        <Text
          onPress={seconds === 0 ? () => setSeconds(30) : undefined}
          style={[styles.link, seconds > 0 && { color: colors.textMuted }]}
        >
          {seconds > 0 ? ` Resend in ${seconds}s` : ' Resend now'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: spacing.xl, backgroundColor: colors.bg, paddingTop: spacing.xxxl * 2 },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.xxl },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  cell: { width: 48, height: 56, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, textAlign: 'center', fontSize: 22, fontWeight: '700', color: colors.text },
  error: { color: colors.danger, marginBottom: spacing.sm },
  resend: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  muted: { ...typography.body, color: colors.textMuted },
  link: { ...typography.label, color: colors.primary },
});
