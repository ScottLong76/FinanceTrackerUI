import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      Sidebar!!!
      <Drawer variant="permanent" open={true}>
        <List>
          {['Item 1', 'Item 2', 'Item 3'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;