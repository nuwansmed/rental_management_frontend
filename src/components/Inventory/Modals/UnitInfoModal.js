import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';

const UnitInfoModal = ({ open, onClose, unit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Unit Details</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: '70vh' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{unit?.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Model</TableCell>
              <TableCell>{unit?.model_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>{unit?.industry_category_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Machine Type</TableCell>
              <TableCell>{unit?.machine_type_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Power Source</TableCell>
              <TableCell>{unit?.power_source}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Power Specifications</TableCell>
              <TableCell>{unit?.power_specifications}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Machine Description</TableCell>
              <TableCell>{unit?.machine_description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accessories</TableCell>
              <TableCell>{unit?.accessories}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Supplier Name</TableCell>
              <TableCell>{unit?.supplier_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Supplier Contact</TableCell>
              <TableCell>{unit?.supplier_contact}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>{unit?.invoice_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Purchase Cost</TableCell>
              <TableCell>{unit?.purchase_cost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Purchase</TableCell>
              <TableCell>{unit?.date_of_purchase}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Warranty Expiration Date</TableCell>
              <TableCell>{unit?.warranty_expiration_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Insurance Policy Number</TableCell>
              <TableCell>{unit?.insurance_policy_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Insurance Expiration Date</TableCell>
              <TableCell>{unit?.insurance_expiration_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>{unit?.initial_condition}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Warehouse Location</TableCell>
              <TableCell>{unit?.warehouse_location}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Notes</TableCell>
              <TableCell>{unit?.notes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitInfoModal;
