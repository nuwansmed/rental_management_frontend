// src/components/InfoBatchModal.js

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const BatchInfoModal = ({ open, onClose, batch }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Batch Details</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: '70vh' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {/* General Information */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Brand</Typography>
                </TableCell>
                <TableCell>{batch.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Model Number</Typography>
                </TableCell>
                <TableCell>{batch.model_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Category</Typography>
                </TableCell>
                <TableCell>{batch.industry_category_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Machine Type</Typography>
                </TableCell>
                <TableCell>{batch.machine_type_name}</TableCell>
              </TableRow>

              {/* Technical Specifications */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Power Source</Typography>
                </TableCell>
                <TableCell>{batch.power_source_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Power Specifications</Typography>
                </TableCell>
                <TableCell>{batch.power_specifications}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Machine Description</Typography>
                </TableCell>
                <TableCell>{batch.machine_description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Accessories</Typography>
                </TableCell>
                <TableCell>{batch.accessories || 'N/A'}</TableCell>
              </TableRow>

              {/* Supplier Information */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Supplier Name</Typography>
                </TableCell>
                <TableCell>{batch.supplier_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Supplier Contact</Typography>
                </TableCell>
                <TableCell>{batch.supplier_contact}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Invoice Number</Typography>
                </TableCell>
                <TableCell>{batch.invoice_number}</TableCell>
              </TableRow>

              {/* Financial and Date Information */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Purchase Cost</Typography>
                </TableCell>
                <TableCell>{batch.purchase_cost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Date of Purchase</Typography>
                </TableCell>
                <TableCell>{batch.date_of_purchase}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Warranty Expiration Date</Typography>
                </TableCell>
                <TableCell>{batch.warranty_expiration_date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Insurance Policy Number</Typography>
                </TableCell>
                <TableCell>{batch.insurance_policy_number || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Insurance Expiration Date</Typography>
                </TableCell>
                <TableCell>{batch.insurance_expiration_date}</TableCell>
              </TableRow>

              {/* Condition and Location Information */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Condition</Typography>
                </TableCell>
                <TableCell>{batch.initial_condition_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Warehouse Location</Typography>
                </TableCell>
                <TableCell>{batch.warehouse_location_name}</TableCell>
              </TableRow>

              {/* Notes */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Notes</Typography>
                </TableCell>
                <TableCell>{batch.notes || 'N/A'}</TableCell>
              </TableRow>

              {/* Units */}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Number of Items</Typography>
                </TableCell>
                <TableCell>{batch.number_of_items}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BatchInfoModal;
