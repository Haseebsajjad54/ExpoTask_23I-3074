import * as Device from 'expo-device';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const products = [
  { id: 'canvas-tote', name: 'Everyday Canvas Tote', price: '$24.00' },
  { id: 'ceramic-mug', name: 'Stoneware Coffee Mug', price: '$18.00' },
];

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [bagItems, setBagItems] = useState<string[]>([]);

  function toggleBagItem(productId: string) {
    setBagItems((currentItems) =>
      currentItems.includes(productId)
        ? currentItems.filter((item) => item !== productId)
        : [...currentItems, productId]
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title}>
              Welcome to Expo
            </ThemedText>
            <ThemedText type="subtitle" style={styles.studentName}>
              Haseeb Sajjad
            </ThemedText>
            <ThemedText type="default">Roll No: 23I-3074</ThemedText>
          </ThemedView>

          <ThemedText type="code" style={styles.code}>
            get started
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <HintRow
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Dev tools" hint={getDevMenuHint()} />
            <HintRow
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>

          <ThemedView style={styles.productSection}>
            <ThemedView style={styles.productHeading}>
              <ThemedText type="subtitle" style={styles.productTitle}>
                Product Explorer
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                A few everyday favorites
              </ThemedText>
            </ThemedView>
            {products.map((product) => {
              const isInBag = bagItems.includes(product.id);
              return (
                <ThemedView
                  key={product.id}
                  type="backgroundElement"
                  style={styles.productCard}>
                  <ThemedView style={styles.productInfo}>
                    <ThemedText type="default" style={styles.productName}>
                      {product.name}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {product.price}
                    </ThemedText>
                  </ThemedView>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${isInBag ? 'Remove' : 'Add'} ${product.name} ${isInBag ? 'from' : 'to'} bag`}
                    onPress={() => toggleBagItem(product.id)}
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                    <ThemedText type="smallBold" style={styles.buttonText}>
                      {isInBag ? 'Added' : 'Add to bag'}
                    </ThemedText>
                  </Pressable>
                </ThemedView>
              );
            })}
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: 'stretch',
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  studentName: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    alignSelf: 'stretch',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  productSection: {
    gap: Spacing.three,
    paddingTop: Spacing.two,
  },
  productHeading: {
    gap: Spacing.one,
  },
  productTitle: {
    fontSize: 28,
    lineHeight: 36,
  },
  productCard: {
    alignItems: 'center',
    borderRadius: Spacing.three,
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
    padding: Spacing.three,
  },
  productInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  productName: {
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3478F6',
    borderRadius: Spacing.two,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.three,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
