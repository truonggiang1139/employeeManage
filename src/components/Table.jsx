import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function Table(props) {
  const { employees, columns } = props;
  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
          marginTop: "20px",
          "& .super-app-theme--header": {
            backgroundColor: "royalblue",
            color: "white",
            fontWeight: "bold",
          },
        }}
      >
        <DataGrid
          rows={employees}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnMenu
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
        />
      </Box>
    </>
  );
}
