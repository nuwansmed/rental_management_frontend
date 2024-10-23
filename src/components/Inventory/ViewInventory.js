import React, { useState } from 'react';
import { Container, Box, Paper } from '@mui/material';
import RibbonTemplate from '../RibbonTemplate'; // Import the new template
import UnitInventoryTable from './UnitInventoryTable';
import BatchInventoryTable from './BatchInventoryTable';
import AddEquipmentModal from './Modals/AddEquipmentModal'; // Import the modal

const ViewInventory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddToInventory = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Use RibbonTemplate with Inventory-specific content */}
      <RibbonTemplate
        title="Inventory"
        buttonLabel="Add to Inventory"
        onButtonClick={handleAddToInventory}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Items' },
          { label: 'Batches' },
        ]}
      />

      {/* Render Tab Content */}
      <Paper elevation={3} sx={{ borderRadius: 2, marginTop: 3, padding: 2 }}>
        {tabValue === 0 && (
          <Box>
            <UnitInventoryTable />
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <BatchInventoryTable />
          </Box>
        )}
      </Paper>

      {/* Add Equipment Modal */}
      <AddEquipmentModal open={isModalOpen} handleClose={handleCloseModal} />
    </Container>
  );
};

export default ViewInventory;
