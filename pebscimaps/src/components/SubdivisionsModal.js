import React from 'react';
import { Modal, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none',
  '@media (max-width: 600px)': {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    transform: 'none',
    borderRadius: 0,
  },
};

const SubdivisionsModal = ({ open, handleClose, title, links }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="subdivision-modal-title"
      aria-describedby="subdivision-modal-description"
      style={{color: 'black'}}
    >
      <Box sx={style}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>
        <h2 id="subdivision-modal-title">{title}</h2>
        <List>
          {links.map((link, index) => (
            <ListItem button onClick={handleClose} component={Link} href={link.href} key={index}>
              <img src={link.flag} alt={`${link.text} flag`} width={24} height={'auto'} style={{ marginRight: '8px' }} />
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default SubdivisionsModal;