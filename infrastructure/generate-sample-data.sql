-- Generate sample data for Mobile Ticketing System

-- Insert sample users
INSERT INTO users (email, phone, password_hash, first_name, last_name, role)
VALUES
    ('admin@example.com', '+1234567890', '$2a$10$XQCg1z4RmQr2odUKV9YYwehk3ZB3hLU8jRAX9.OPxnN9YlWQcmvPe', 'Admin', 'User', 'admin'),
    ('organizer@example.com', '+1234567891', '$2a$10$XQCg1z4RmQr2odUKV9YYwehk3ZB3hLU8jRAX9.OPxnN9YlWQcmvPe', 'Event', 'Organizer', 'organizer'),
    ('staff@example.com', '+1234567892', '$2a$10$XQCg1z4RmQr2odUKV9YYwehk3ZB3hLU8jRAX9.OPxnN9YlWQcmvPe', 'Staff', 'Member', 'staff'),
    ('attendee1@example.com', '+1234567893', '$2a$10$XQCg1z4RmQr2odUKV9YYwehk3ZB3hLU8jRAX9.OPxnN9YlWQcmvPe', 'John', 'Doe', 'attendee'),
    ('attendee2@example.com', '+1234567894', '$2a$10$XQCg1z4RmQr2odUKV9YYwehk3ZB3hLU8jRAX9.OPxnN9YlWQcmvPe', 'Jane', 'Smith', 'attendee')
ON CONFLICT (email) DO NOTHING;

-- Get user IDs
DO $$
DECLARE
    organizer_id UUID;
    attendee1_id UUID;
    attendee2_id UUID;
    staff_id UUID;
    event1_id UUID;
    event2_id UUID;
BEGIN
    -- Get user IDs
    SELECT id INTO organizer_id FROM users WHERE email = 'organizer@example.com';
    SELECT id INTO attendee1_id FROM users WHERE email = 'attendee1@example.com';
    SELECT id INTO attendee2_id FROM users WHERE email = 'attendee2@example.com';
    SELECT id INTO staff_id FROM users WHERE email = 'staff@example.com';
    
    -- Insert sample events
    INSERT INTO events (title, description, event_date, start_time, end_time, venue_name, venue_address, venue_city, price, is_free, capacity, organizer_id, status, image_url)
    VALUES
        ('Summer Music Festival', 'Annual music festival featuring top local and international artists', '2023-08-15', '16:00:00', '22:00:00', 'Central Park', '123 Park Avenue', 'New York', 0.00, TRUE, 1000, organizer_id, 'published', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=600&q=80'),
        ('Tech Conference 2023', 'Conference for developers and tech enthusiasts', '2023-10-20', '09:00:00', '18:00:00', 'Convention Center', '456 Tech Blvd', 'San Francisco', 99.99, FALSE, 500, organizer_id, 'published', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80')
    RETURNING id INTO event1_id;
    
    -- Get the second event ID
    SELECT id INTO event2_id FROM events WHERE title = 'Tech Conference 2023';
    
    -- Insert sample tickets
    INSERT INTO tickets (event_id, user_id, ticket_type, price, qr_code, is_used)
    VALUES
        (event1_id, attendee1_id, 'VIP', 0.00, 'TICKET-123', FALSE),
        (event1_id, attendee2_id, 'General', 0.00, 'TICKET-456', FALSE),
        (event2_id, attendee1_id, 'Early Bird', 79.99, 'TICKET-789', FALSE);
    
    -- Insert sample staff
    INSERT INTO staff (event_id, user_id, position, permissions, status, payment)
    VALUES
        (event1_id, staff_id, 'Security', ARRAY['scan_tickets'], 'accepted', 150.00),
        (event2_id, staff_id, 'Ticket Scanner', ARRAY['scan_tickets'], 'pending', 120.00);
    
    -- Insert sample notifications
    INSERT INTO notifications (user_id, title, message, notification_type, related_id)
    VALUES
        (attendee1_id, 'Ticket Confirmation', 'Your ticket for Summer Music Festival has been confirmed!', 'ticket', event1_id),
        (attendee2_id, 'Ticket Confirmation', 'Your ticket for Summer Music Festival has been confirmed!', 'ticket', event1_id),
        (staff_id, 'Staff Position Request', 'You have been invited to work as Security at Summer Music Festival', 'staff_request', event1_id);
    
END $$;
