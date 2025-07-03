import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  ShoppingCart,
  Person,
  Inventory,
  ListAlt,
  Receipt,
  Add,
  Refresh,
  Description,
  PersonOutline,
} from '@mui/icons-material';
import CollapsibleMenu from '../ui/CollapsibleMenu';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: MenuItem[];
  onClick?: () => void;
}

// Example usage component
const SidebarMenuList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('product-list');

  const menuItems: MenuItem[] = [
    {
      id: 'ecommerce',
      label: 'E-commerce',
      icon: <ShoppingCart />,
      badge: '●',
      children: [
        {
          id: 'admin',
          label: 'Admin',
          badge: '●',
          children: [
            {
              id: 'product-listing',
              label: 'Product listing',
              onClick: () => console.log('Product listing clicked'),
            },
            {
              id: 'product-list',
              label: 'Product list',
              onClick: () => console.log('Product list clicked'),
            },
            {
              id: 'order-list',
              label: 'Order list',
              onClick: () => console.log('Order list clicked'),
            },
            {
              id: 'order',
              label: 'Order',
              onClick: () => console.log('Order clicked'),
            },
            {
              id: 'create-order',
              label: 'Create order',
              badge: 'New',
              onClick: () => console.log('Create order clicked'),
            },
            {
              id: 'refund',
              label: 'Refund',
              onClick: () => console.log('Refund clicked'),
            },
            {
              id: 'invoice-list',
              label: 'Invoice list',
              onClick: () => console.log('Invoice list clicked'),
            },
            {
              id: 'invoice',
              label: 'Invoice',
              onClick: () => console.log('Invoice clicked'),
            },
          ],
        },
        {
          id: 'customer',
          label: 'Customer',
          icon: <PersonOutline />,
          children: [
            {
              id: 'customer-list',
              label: 'Customer list',
              onClick: () => console.log('Customer list clicked'),
            },
            {
              id: 'customer-details',
              label: 'Customer details',
              onClick: () => console.log('Customer details clicked'),
            },
          ],
        },
      ],
    },
  ];

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item.id);
    console.log('Selected item:', item.label);
  };

  return (
    <Box sx={{ p: 2 }}>
      <CollapsibleMenu
        items={menuItems}
        selectedItem={selectedItem}
        onItemClick={handleItemClick}
      />
    </Box>
  );
};

export default SidebarMenuList;