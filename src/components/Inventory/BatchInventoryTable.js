// src/components/BatchInventoryTable.js

import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Info } from '@mui/icons-material';
import api from '../../api';
import Loader from '../Loader'; // Import your Loader component
import EditBatchModal from './Modals/EditBatchModal';
import BatchInfoModal from './Modals/BatchInfoModal';

const BatchInventoryTable = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inventory/v1/batches/');
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = (batch) => {
    setSelectedBatch(batch);
    setIsDetailsModalOpen(true);
  };

  const handleEditClick = (batch) => {
    setSelectedBatch(batch);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/v1/batches/${id}/`);
      alert('Batch deleted successfully!');
      fetchBatches(); // Refresh the table
    } catch (error) {
      console.error('Error deleting batch:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Batch ID', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model_number', headerName: 'Model', width: 150 },
    { field: 'industry_category_name', headerName: 'Category', width: 150 },
    { field: 'machine_type_name', headerName: 'Machine Type', width: 150 },
    {
      field: 'number_of_items',
      headerName: 'No. of Items',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleDetailsClick(params.row)}>
            <Info />
          </IconButton>
          <IconButton color="warning" onClick={() => handleEditClick(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', position: 'relative' }}>
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <DataGrid
          rows={batches}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id}
        />
      )}

      {selectedBatch && (
        <>
          <BatchInfoModal
            open={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            batch={selectedBatch}
          />
          <EditBatchModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            batch={selectedBatch}
          />
        </>
      )}
    </Box>
  );
};

export default BatchInventoryTable;
