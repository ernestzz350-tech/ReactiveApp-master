import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import type { MenuItem, MenuItemInput, Notice } from '@/types/menu';

const NOTICE_DURATION_MS = 3500;

const SEED_ITEMS: MenuItem[] = [
  {
    id: 'seed-1',
    name: 'Tomato & Basil Soup',
    description: 'Roasted tomato soup finished with fresh basil and cream.',
    course: 'Starter',
    price: 55,
  },
  {
    id: 'seed-2',
    name: 'Calamari Rings',
    description: 'Lightly fried calamari with lemon and garlic aioli.',
    course: 'Starter',
    price: 79,
  },
  {
    id: 'seed-3',
    name: 'Grilled Beef Fillet',
    description: 'Served with creamy mash and a red wine jus.',
    course: 'Main Course',
    price: 165,
  },
  {
    id: 'seed-4',
    name: 'Chicken Curry',
    description: 'Slow-cooked curry with basmati rice and sambals.',
    course: 'Main Course',
    price: 125,
  },
  {
    id: 'seed-5',
    name: 'Malva Pudding',
    description: 'Warm sponge pudding with custard.',
    course: 'Dessert',
    price: 60,
  },
];

type MenuContextValue = {
  items: MenuItem[];
  notice: Notice | null;
  addItem: (input: MenuItemInput) => void;
  updateItem: (id: string, input: MenuItemInput) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => MenuItem | undefined;
  dismissNotice: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(SEED_ITEMS);
  const [notice, setNotice] = useState<Notice | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(1);

  const dismissNotice = useCallback(() => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice(null);
  }, []);

  const showNotice = useCallback((type: Notice['type'], message: string) => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ type, message });
    noticeTimer.current = setTimeout(() => setNotice(null), NOTICE_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, []);

  const addItem = useCallback(
    (input: MenuItemInput) => {
      const id = `item-${Date.now()}-${nextId.current++}`;
      setItems((current) => [...current, { id, ...input }]);
      showNotice('success', `"${input.name}" was added to the menu.`);
    },
    [showNotice],
  );

  const updateItem = useCallback(
    (id: string, input: MenuItemInput) => {
      setItems((current) => current.map((item) => (item.id === id ? { id, ...input } : item)));
      showNotice('success', `"${input.name}" was updated.`);
    },
    [showNotice],
  );

  const deleteItem = useCallback(
    (id: string) => {
      const target = items.find((item) => item.id === id);
      setItems((current) => current.filter((item) => item.id !== id));
      showNotice('success', target ? `"${target.name}" was deleted.` : 'Menu item deleted.');
    },
    [items, showNotice],
  );

  const getItem = useCallback((id: string) => items.find((item) => item.id === id), [items]);

  const value = useMemo(
    () => ({ items, notice, addItem, updateItem, deleteItem, getItem, dismissNotice }),
    [items, notice, addItem, updateItem, deleteItem, getItem, dismissNotice],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu(): MenuContextValue {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside a MenuProvider');
  }
  return context;
}
