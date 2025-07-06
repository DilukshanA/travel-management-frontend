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
  ListItemIcon,
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
  CheckCircle,
} from '@mui/icons-material';
import CollapsibleMenu from '../ui/CollapsibleMenu';
import CircleIcon from '@mui/icons-material/Circle';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}

type CollapsibleMenuProps = {
  open?: boolean;
}

// Example usage component
const SidebarMenuList: React.FC<CollapsibleMenuProps> = ({open}) => {
  const [selectedItem, setSelectedItem] = useState<string>('product-list');

  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon/>,
      onClick: () => router.push('/admin-dashboard'),
    },
    {
        id: 'travel-ride',
        label: 'Travel Ride',
        icon: <PersonOutline />,
        children: [
            {
                id: 'create-ride',
                label: 'Create Ride',
                onClick: () => router.push('/admin-dashboard/travel-ride/create-ride'),
            }
        ]

    },
    {
        id: 'users',
        label: 'Users',
        icon: <Person />,
        children: [
            {
                id: 'passenger',
                label: 'Passengers',
                badge: <CircleIcon color="success" sx={{fontSize: '10px'}}/>,
            },
            {
                id: 'driver',
                label: 'Drivers',
            },
            {
                id: 'assistant',
                label: 'Assistants',
            }
        ]
    },
    {
        id: 'vehicles',
        label: 'Vehicles',
        icon: <Inventory />,
        badge: <FiberNewIcon color="success" sx={{fontSize: '20px'}}/>,
    }
  ];

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item.id);
    item.onClick?.();
  };

  return (
    <Box>
      {open && (
      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={(theme) => ({
            ml: 2,
            mb: 2,
            color: theme.palette.mode === 'light' ? '#606060' : '#c2c2c2',
          })}
        >Menu
      </Typography>
        <CollapsibleMenu
          items={menuItems}
          selectedItem={selectedItem}
          onItemClick={handleItemClick}
        />
      </Box>
      )}
      {!open && (
          <List>
            {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            ))}
          </List>
      )}
    </Box>
  );
};

export default SidebarMenuList;