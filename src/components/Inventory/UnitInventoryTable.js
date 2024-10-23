import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Info } from '@mui/icons-material';
import api from '../../api';
import Loader from '../Loader';
import EditUnitModal from './Modals/EditUnitModal';
import UnitInfoModal from './Modals/UnitInfoModal';

const UnitInventoryTable = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inventory/v1/units/list-all/');
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = (unit) => {
    setSelectedUnit(unit);
    setInfoModalOpen(true);
  };

  const handleEditClick = (unit) => {
    setSelectedUnit(unit);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/v1/units/${id}/`);
      alert('Unit deleted successfully!');
      fetchUnits(); // Refresh the table
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };

  const columns = [
    { field: 'equipment_id', headerName: 'Equipment ID/SKU', width: 150 },
    { field: 'serial_number', headerName: 'Serial Number', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model_number', headerName: 'Model', width: 150 },
    { field: 'industry_category_name', headerName: 'Category', width: 150 },
    { field: 'machine_type_name', headerName: 'Machine Type', width: 150 },
    { field: 'initial_condition', headerName: 'Condition', width: 150 },
    { field: 'warehouse_location', headerName: 'Warehouse', width: 150 },
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Loader />
        </Box>
      ) : (
        <DataGrid
          rows={units}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id}
        />
      )}
      <UnitInfoModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} unit={selectedUnit} />
      <EditUnitModal open={editModalOpen} onClose={() => setEditModalOpen(false)} unit={selectedUnit} onSave={fetchUnits} />
    </Box>
  );
};

export default UnitInventoryTable;
