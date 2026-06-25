import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Screen, ScreenHeader, Card, Avatar, Badge, Button } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { Routes } from '@/constants/routes';
import { colors } from '@/constants/colors';
import { radius, spacing, typography } from '@/constants/sizes';

export default function ProfileScreen() {
  const nav = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  if (!user) return <Screen><ScreenHeader title="Profile" /></Screen>;

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Edit profile', onPress: () => nav.navigate(Routes.EditProfile) },
        { icon: 'shield-checkmark-outline', label: 'KYC verification', onPress: () => nav.navigate(Routes.KYC), badge: user.kycStatus },
        { icon: 'key-outline', label: 'Change password', onPress: () => nav.navigate(Routes.ChangePassword) },
      ],
    },
    {
      title: 'Activity',
      items: [
        { icon: 'heart-outline', label: 'Favorites', onPress: () => nav.navigate(Routes.Favorites) },
        { icon: 'git-compare-outline', label: 'Compare list', onPress: () => nav.navigate(Routes.Compare) },
        { icon: 'megaphone-outline', label: 'My leads', onPress: () => nav.navigate(Routes.LeadsTab) },
      ],
    },
    {
      title: 'Billing',
      items: [
        { icon: 'sparkles-outline', label: 'Subscription plans', onPress: () => nav.navigate(Routes.Plans) },
        { icon: 'cash-outline', label: 'Credits & top up', onPress: () => nav.navigate(Routes.Credits) },
        { icon: 'receipt-outline', label: 'Purchase history', onPress: () => nav.navigate(Routes.PurchaseHistory) },
      ],
    },
    {
      title: 'Vendor',
      items: [
        { icon: 'business-outline', label: 'Vendor dashboard', onPress: () => nav.navigate(Routes.VendorDashboard) },
        { icon: 'bar-chart-outline', label: 'Analytics', onPress: () => nav.navigate(Routes.Analytics) },
      ],
    },
    {
      title: 'Preferences & support',
      items: [
        { icon: 'notifications-outline', label: 'Notifications', onPress: () => nav.navigate(Routes.NotificationSettings) },
        { icon: 'lock-closed-outline', label: 'Privacy', onPress: () => nav.navigate(Routes.PrivacySettings) },
        { icon: 'settings-outline', label: 'Settings', onPress: () => nav.navigate(Routes.Settings) },
        { icon: 'help-circle-outline', label: 'Help & support', onPress: () => nav.navigate(Routes.SupportTickets) },
        { icon: 'sparkles-outline', label: 'AI Assistant', onPress: () => nav.navigate(Routes.AIAssistant) },
        { icon: 'shield-outline', label: 'Admin panel', onPress: () => nav.navigate(Routes.AdminDashboard) },
      ],
    },
  ];

  return (
    <Screen>
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <Card style={styles.profileCard}>
          <Avatar name={user.name} size={64} uri={user.avatarUrl} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.subtitle}>{user.email}</Text>
            <View style={{ flexDirection: 'row', gap: spacing.xs, marginTop: spacing.xs }}>
              <Badge label={user.plan.toUpperCase()} tone="accent" />
              <Badge label={user.role.toUpperCase()} tone="info" />
            </View>
          </View>
        </Card>

        <View style={styles.statsRow}>
          <Stat label="Credits" value={String(user.credits)} />
          <Stat label="Plan" value={user.plan} />
          <Stat label="KYC" value={user.kycStatus} />
        </View>

        {sections.map((sec) => (
          <View key={sec.title} style={{ marginTop: spacing.lg }}>
            <Text style={styles.section}>{sec.title}</Text>
            <Card style={{ padding: 0 }}>
              {sec.items.map((it, idx) => (
                <Pressable key={it.label} onPress={it.onPress} style={[styles.row, idx < sec.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                  <Ionicons name={it.icon as any} size={20} color={colors.primary} />
                  <Text style={[typography.body as any, { flex: 1, marginLeft: spacing.md }]}>{it.label}</Text>
                  {('badge' in it) && it.badge ? <Badge label={String(it.badge)} tone="info" /> : null}
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={{ marginLeft: spacing.sm }} />
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <Button title="Sign out" variant="danger" onPress={() => Alert.alert('Sign out?', 'You will need to sign in again.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign out', style: 'destructive', onPress: () => signOut() },
        ])} fullWidth style={{ marginTop: spacing.xl }} />

        <Text style={styles.version}>ContractIndia v1.0.0</Text>
      </ScrollView>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: { flexDirection: 'row', alignItems: 'center' },
  name: { ...typography.h2, color: colors.text },
  subtitle: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  stat: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statValue: { ...typography.h3, color: colors.text, textTransform: 'capitalize' },
  statLabel: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  section: { ...typography.label, color: colors.textMuted, marginBottom: spacing.sm, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  version: { ...typography.small, color: colors.textMuted, textAlign: 'center', marginTop: spacing.lg },
});
