import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

// ---------- types ----------
export type ExpenseItem = {
  id: string;
  label: string;
  icon: string;         // emoji or any string you render
  percent: number;      // e.g. 32
  amount: number;       // e.g. 22400
};

type Props = {
  title?: string;
  items: ExpenseItem[];
  currencySymbol?: string;
  emptyText?: string;
};

// ---------- helpers ----------
const formatAmount = (n: number) =>
  n.toLocaleString('uk-UA');          // "22 400" style

// ---------- sub-components ----------
const IconBox = ({ icon }: { icon: string }) => (
  <View style={styles.iconBox}>
    <Text style={styles.iconText}>{icon}</Text>
  </View>
);

const ExpenseRow = ({
  item,
  currency,
}: {
  item: ExpenseItem;
  currency: string;
}) => (
  <View style={styles.row}>
    <IconBox icon={item.icon} />

    <View style={styles.rowMeta}>
      <Text style={styles.rowLabel}>{item.label}</Text>
      <Text style={styles.rowPercent}>{item.percent}% бюджету</Text>
    </View>

    <Text style={styles.rowAmount}>
      {currency}{formatAmount(item.amount)}
    </Text>
  </View>
);

// ---------- main component ----------
const MonthlyExpenses: React.FC<Props> = ({
  title = 'Аналіз витрат за місяць',
  items,
  currencySymbol = '₴',
  emptyText = 'Витрат за цей місяць ще немає',
}) => {
  return (
    <>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.card}>

        {items.length === 0 ? (
            <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{emptyText}</Text>
            </View>
        ) : (
            <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <ExpenseRow item={item} currency={currencySymbol} />
            )}
            />
        )}
        </View>
    </>
  );
};

export default MonthlyExpenses;

// ---------- styles ----------
const TEAL = '#1C1C1E';
const BG   = '#1A1A1A';
const CARD = '#0F0F0F';

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1
  },

  title: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 5,
  },

  // ---------- row ----------
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  iconText: {
    fontSize: 20,
  },

  rowMeta: {
    flex: 1,
  },

  rowLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  rowPercent: {
    color: '#8A8A8A',
    fontSize: 13,
    marginTop: 2,
  },

  rowAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // ---------- empty ----------
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },

  emptyText: {
    color: '#8A8A8A',
    fontSize: 15,
    textAlign: 'center',
  },
});