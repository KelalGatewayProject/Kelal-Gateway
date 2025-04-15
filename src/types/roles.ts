// Define user roles
export type UserRole = "admin" | "organizer" | "member" | "attendee";

// Define permissions for each role
export const rolePermissions = {
  admin: {
    createEvent: true,
    editEvent: true,
    deleteEvent: true,
    approveEvent: true,
    viewAllEvents: true,
    manageUsers: true,
    manageStaff: true,
    viewReports: true,
    scanTickets: true,
    issueCredits: true,
  },
  organizer: {
    createEvent: true,
    editEvent: true,
    deleteEvent: true,
    approveEvent: false,
    viewAllEvents: false,
    manageUsers: false,
    manageStaff: true,
    viewReports: true,
    scanTickets: true,
    issueCredits: false,
  },
  member: {
    createEvent: false,
    editEvent: false,
    deleteEvent: false,
    approveEvent: false,
    viewAllEvents: false,
    manageUsers: false,
    manageStaff: false,
    viewReports: false,
    scanTickets: false,
    issueCredits: false,
  },
  attendee: {
    createEvent: false,
    editEvent: false,
    deleteEvent: false,
    approveEvent: false,
    viewAllEvents: false,
    manageUsers: false,
    manageStaff: false,
    viewReports: false,
    scanTickets: false,
    issueCredits: false,
  },
};
