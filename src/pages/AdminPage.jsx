import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout, { StyledPageLayout } from "../components/PageLayout.jsx";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [managerOptions, setManagerOptions] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    manager: 0,
    role: "MANAGER",
    vacationDays: 20
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/employees/all", {
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
        const managers = data.filter((u) => u.role === "MANAGER");
        setManagerOptions(managers);
        setNewUser((prev) => ({
          ...prev,
          manager: managers.length > 0 ? managers[0].id : 0,
          role: "MANAGER"
        }));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setOpen(true);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      jobTitle: "",
      manager: managerOptions.length > 0 ? managerOptions[0].id : 0,
      role: "MANAGER",
      vacationDays: 20
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      jobTitle: "",
      manager: managerOptions.length > 0 ? managerOptions[0].id : 0,
      role: "MANAGER",
      vacationDays: 20
    });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:8080/employees/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const created = await response.json();
        setUsers([...users, created]);
        handleClose();
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

 const handleEdit = async () => {
  try {
    const response = await fetch(`http://localhost:8080/employees/edit/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        jobTitle: newUser.jobTitle,
        manager: newUser.manager,
        role: newUser.role,
        vacationDays: newUser.vacationDays
      }),
    });

    if (response.ok) {
      const updated = await response.json();
      const updatedUsers = users.map((u) => (u.id === updated.id ? updated : u));
      setUsers(updatedUsers);
      handleClose();
    }
  } catch (error) {
    console.error("Failed to edit user:", error);
  }
};


  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN": return "success";
      case "MANAGER": return "warning";
      default: return "default";
    }
  };

  const openEditDialog = (user) => {
    setEditMode(true);
    setEditingUserId(user.id);
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      manager: user.manager,
      role: user.role,
      vacationDays: user.vacationDays
    });
    setOpen(true);
  };
  
const groupedUsers = users.reduce((acc, user) => {
  const letter = user.firstName.charAt(0).toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(user);
  return acc;
}, {});


  return (
    <StyledPageLayout>
      <Box sx={{ paddingTop: 10, paddingBottom: 10, px: 6, maxWidth: '1600px', margin: '0 auto' }}>
        <Box className="bg-white shadow-md rounded-xl px-6 py-4 mb-10" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Admin Panel
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="contained" color="success" onClick={handleOpen}>
              + Create User
            </Button>
            <Link to="/">
              <Button variant="outlined" color="primary">
                Go to Home
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ width: '100%', marginTop: 4 }}>
  {isLoading ? (
    <Typography>Loading users...</Typography>
  ) : (
    Object.keys(groupedUsers)
      .sort()
      .map((letter) => (
        <Box key={letter} sx={{ width: '100%', mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {letter}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {groupedUsers[letter].map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl overflow-hidden shadow-md transition duration-300 hover:shadow-xl border border-gray-100" sx={{ backgroundColor: '#f9fafb', width: 320, height: 360 }}>
                  <CardContent className="p-6">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                          {user.firstName.charAt(0)}
                        </Avatar>
                        <div>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </div>
                      </div>
                      <Divider className="my-3" />
                      <Typography variant="body2" gutterBottom><strong>Job Title:</strong> {user.jobTitle}</Typography>
                      <Typography variant="body2" gutterBottom><strong>Vacation Days:</strong> {user.vacationDays}</Typography>
                      {user.managerFirstName && user.managerLastName && (
                        <Typography variant="body2" gutterBottom>
                          <strong>Managed by:</strong> {user.managerFirstName} {user.managerLastName}
                        </Typography>
                      )}
                      {user.role && (
                        <Chip label={user.role === "EMPLOYEE_BASIC" ? "WORKER" : user.role} color={getRoleColor(user.role)} variant="outlined" size="small" className="mt-2" />
                      )}
                    </div>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                      <Button fullWidth variant="contained" color="primary" size="small" onClick={() => openEditDialog(user)}>Edit</Button>
                      <Button fullWidth variant="outlined" color="error" size="small" onClick={() => handleDelete(user.id)}>Delete</Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      ))
  )}
</Box>


        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>{editMode ? "Edit User" : "Create New User"}</DialogTitle>
          <DialogContent>
            <Paper elevation={3} sx={{ backgroundColor: '#f0f4f8', padding: 4, borderRadius: 2 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" name="firstName" value={newUser.firstName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" name="lastName" value={newUser.lastName} onChange={handleChange} />
                </Grid>
                {!editMode && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email" name="email" value={newUser.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Password" name="password" type="password" value={newUser.password} onChange={handleChange} />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField fullWidth label="Job Title" name="jobTitle" value={newUser.jobTitle} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Vacation Days" name="vacationDays" type="number" value={newUser.vacationDays} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="manager-select-label">Manager</InputLabel>
                    <Select labelId="manager-select-label" value={newUser.manager} label="Manager" name="manager" onChange={handleChange} sx={{ minHeight: 56 }}>
                      {managerOptions.map((manager) => (
                        <MenuItem key={manager.id} value={manager.id}>
                          {manager.firstName} {manager.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      name="role"
                      value={newUser.role}
                      onChange={handleChange}
                      label="Role"
                      sx={{ minHeight: 56 }}
                    >
                      <MenuItem value="ADMIN">
                        <Chip label="ADMIN" color="success" size="medium" />
                      </MenuItem>
                      <MenuItem value="MANAGER">
                        <Chip label="MANAGER" color="warning" size="medium" />
                      </MenuItem>
                      <MenuItem value="EMPLOYEE_BASIC">
                        <Chip label="WORKER" color="default" size="medium" />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={editMode ? handleEdit : handleCreate} variant="contained" color="primary">
              {editMode ? "Save Changes" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </StyledPageLayout>
  );
};

export default AdminPage;