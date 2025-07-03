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

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: MenuItem[];
  onClick?: () => void;
}

interface CollapsibleMenuProps {
  items: MenuItem[];
  selectedItem?: string;
  onItemClick?: (item: MenuItem) => void;
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  items,
  selectedItem,
  onItemClick,
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleToggle = (itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      handleToggle(item.id);
    } else {
      onItemClick?.(item);
    }
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const isSelected = selectedItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems[item.id];

    return (
      <React.Fragment key={item.id}>
        <ListItem
          disablePadding
          sx={{
            pl: depth * 2,
          }}
        >
          <ListItemButton
            onClick={() => handleItemClick(item)}
            selected={isSelected}
            sx={{
              minHeight: 48,
              borderRadius: 1,
              mb: 0.5,
              backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
              '&:hover': {
                backgroundColor: isSelected ? '#e3f2fd' : '#f5f5f5',
              },
              '&.Mui-selected': {
                backgroundColor: '#e3f2fd',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              },
            }}
          >
            {item.icon && (
              <Box sx={{ mr: 2, color: '#666', fontSize: 20 }}>
                {item.icon}
              </Box>
            )}
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isSelected ? '#1976d2' : '#333',
                      fontWeight: isSelected ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.badge && (
                    <Box
                      sx={{
                        backgroundColor: '#ff9800',
                        color: 'white',
                        borderRadius: '50%',
                        width: 16,
                        height: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                </Box>
              }
            />
            {hasChildren && (
              <IconButton size="small" sx={{ color: '#666' }}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper' }}>
      <List component="nav" disablePadding>
        {items.map((item) => renderMenuItem(item))}
      </List>
    </Box>
  );
};

export default CollapsibleMenu;