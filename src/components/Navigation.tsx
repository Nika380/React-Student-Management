import React from 'react'
import {Toolbar, AppBar, CssBaseline, Typography, Stack, Link} from '@mui/material'
function Navigation() {
  return (
    <>
        <CssBaseline />
        <AppBar color='transparent'>
            <Toolbar>
                <Stack spacing={3} direction='row'>
                <Link href="/" variant="h5" underline='none' >Student Management</Link>
                <Link href="/teacher-management" variant="h5" underline='none'>Teacher Management</Link>
                <Link href="/group-management" variant="h5" underline='none'>Group Management</Link>
                </Stack>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navigation