import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Event from './Event'


export default function ContextMenu(props) {
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 7,
        }
        :
        null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const ContextComponent = props.contextComponent;
  const goToday = props.goTo;

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <ContextComponent></ContextComponent>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <Event handleClose2={handleClose} date={props.date} getEvents={props.getEvents} />
        <MenuItem onClick={() => { handleClose(); goToday() }} getEvents={props.getEvents}>Go to today</MenuItem>
      </Menu>
    </div>
  );
}
