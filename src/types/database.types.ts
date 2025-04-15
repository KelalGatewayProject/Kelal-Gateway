export interface EventCheckIn {
  id: string;
  event_id: string;
  user_id: string;
  ticket_id: string;
  check_in_time: string;
  ticket_type: string;
  user_name?: string;
}

export interface EventNotification {
  id: string;
  event_id: string;
  title: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

export interface UserNotification {
  id: string;
  notification_id: string;
  user_id: string;
  read: boolean;
  created_at: string;
}

export interface EventTicket {
  id: string;
  event_id: string;
  user_id: string;
  ticket_type: string;
  ticket_price: string;
  purchase_date: string;
  is_checked_in: boolean;
  check_in_time?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  position: string;
  event_id: string;
  permissions: string[];
  accepted: boolean;
  created_at: string;
}

export interface StaffPermission {
  id: string;
  name: string;
  description: string;
  action_type:
    | "scan_tickets"
    | "scan_drinks"
    | "manage_staff"
    | "view_analytics"
    | "view_guest_list"
    | "view_schedule";
}
