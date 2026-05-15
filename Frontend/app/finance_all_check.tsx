import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { spacing } from '@/components/main/design-tokens';
import Return from '@/components/menu/return';
import TransactionHeader from '@/components/allCheck/header';
import TransactionStats from '@/components/allCheck/stats';

export default function AllCheckScreen() {
    return (
        <View style={styles.screen}>
            <Return></Return>
            
            <ScrollView 
                style={styles.scroll}
                contentContainerStyle={{ ...styles.content, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}>
                <TransactionHeader />
                <TransactionStats expenses={1000} expensesPeriod="місяць" averageCheck={200} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 15,
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
});
