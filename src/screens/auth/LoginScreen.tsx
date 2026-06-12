import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { Routes } from '@/constants/routes';
import { colors } from '@/constants/colors';
import { spacing, typography } from '@/constants/sizes';
import { APP_NAME } from '@/constants/config';
import { isEmail, isIndianMobile } from '@/utils/validators';

export default function LoginScreen() {
  const nav = useNavigation<any>();
  const signInWithPassword = useAuthStore((s) => s.signInWithPassword);
  const signInWithOtp = useAuthStore((s) => s.signInWithOtp);

  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submit = async () => {
    setError(undefined);
    if (mode === 'password') {
      if (!isEmail(identifier)) return setError('Enter a valid email');
      if (password.length < 6) return setError('Password too short');
      setLoading(true);
      try {
        await signInWithPassword(identifier, password);
      } catch (e: any) {
        setError(e?.message ?? 'Login failed');
      } finally {
        setLoading(false);
      }
    } else {
      if (!isIndianMobile(identifier)) return setError('Enter a valid 10-digit mobile');
      setLoading(true);
      try {
        const { challengeId } = await signInWithOtp(identifier);
        nav.navigate(Routes.OTP, { challengeId, mobile: identifier });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.brand}>{APP_NAME}</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue exploring vendors and managing leads.</Text>
        </View>

        <View style={styles.modeRow}>
          <Pressable onPress={() => setMode('password')} style={[styles.modeTab, mode === 'password' && styles.modeTabActive]}>
            <Text style={[styles.modeText, mode === 'password' && styles.modeTextActive]}>Password</Text>
          </Pressable>
          <Pressable onPress={() => setMode('otp')} style={[styles.modeTab, mode === 'otp' && styles.modeTabActive]}>
            <Text style={[styles.modeText, mode === 'otp' && styles.modeTextActive]}>OTP</Text>
          </Pressable>
        </View>

        {mode === 'password' ? (
          <>
            <Input
              label="Email"
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={identifier}
              onChangeText={setIdentifier}
              leftIcon={<Ionicons name="mail-outline" size={18} color={colors.textMuted} />}
            />
            <Input
              label="Password"
              placeholder="At least 8 characters"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />}
            />
            <Pressable onPress={() => nav.navigate(Routes.ForgotPassword)} style={{ alignSelf: 'flex-end', marginBottom: spacing.md }}>
              <Text style={styles.link}>Forgot password?</Text>
            </Pressable>
          </>
        ) : (
          <Input
            label="Mobile number"
            placeholder="98xxxxxxxx"
            keyboardType="number-pad"
            value={identifier}
            onChangeText={setIdentifier}
            leftIcon={<Ionicons name="call-outline" size={18} color={colors.textMuted} />}
          />
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title={mode === 'otp' ? 'Send OTP' : 'Sign in'} onPress={submit} loading={loading} fullWidth />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialBtn}><Ionicons name="logo-google" size={20} /></Pressable>
          <Pressable style={styles.socialBtn}><Ionicons name="logo-apple" size={20} /></Pressable>
          <Pressable style={styles.socialBtn}><Ionicons name="logo-facebook" size={20} color={'#1877F2'} /></Pressable>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>New to ContractIndia?</Text>
          <Pressable onPress={() => nav.navigate(Routes.Register)}>
            <Text style={[styles.link, { marginLeft: 4 }]}>Create an account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.xl, paddingTop: spacing.xxxl * 2 },
  header: { marginBottom: spacing.xl },
  brand: { color: colors.accent, fontWeight: '800', letterSpacing: 1, marginBottom: spacing.sm },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 6 },
  modeRow: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 4, marginBottom: spacing.lg },
  modeTab: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: 8 },
  modeTabActive: { backgroundColor: colors.surface },
  modeText: { ...typography.label, color: colors.textMuted },
  modeTextActive: { color: colors.primary },
  link: { ...typography.label, color: colors.primary },
  error: { ...typography.small, color: colors.danger, marginBottom: spacing.sm },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xl, gap: spacing.sm },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.small, color: colors.textMuted },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md },
  socialBtn: { width: 52, height: 52, borderRadius: 26, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xxl },
  footerText: { ...typography.body, color: colors.textMuted },
});
