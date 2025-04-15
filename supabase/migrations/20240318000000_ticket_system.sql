-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT NOT NULL,
    organizer TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ticket_types table
CREATE TABLE ticket_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available INTEGER NOT NULL,
    max_per_user INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ticket_type_id UUID REFERENCES ticket_types(id),
    status TEXT NOT NULL CHECK (status IN ('active', 'used', 'cancelled', 'expired')),
    issued_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_staff table
CREATE TABLE event_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    position TEXT NOT NULL,
    is_scanner BOOLEAN DEFAULT false,
    status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create ticket_validations table
CREATE TABLE ticket_validations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    validated_by UUID REFERENCES auth.users(id),
    validation_time TIMESTAMP WITH TIME ZONE NOT NULL,
    qr_data TEXT NOT NULL,
    is_valid BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(ticket_id, event_id)
);

-- Create RLS policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_validations ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Events are viewable by everyone"
    ON events FOR SELECT
    USING (true);

CREATE POLICY "Events can be created by authenticated users"
    ON events FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Events can be updated by organizers"
    ON events FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM event_staff
            WHERE event_staff.event_id = events.id
            AND event_staff.user_id = auth.uid()
            AND event_staff.status = 'active'
        )
    );

-- Ticket types policies
CREATE POLICY "Ticket types are viewable by everyone"
    ON ticket_types FOR SELECT
    USING (true);

CREATE POLICY "Ticket types can be managed by organizers"
    ON ticket_types FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM event_staff
            WHERE event_staff.event_id = ticket_types.event_id
            AND event_staff.user_id = auth.uid()
            AND event_staff.status = 'active'
        )
    );

-- Tickets policies
CREATE POLICY "Users can view their own tickets"
    ON tickets FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Event staff can view event tickets"
    ON tickets FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM event_staff
            WHERE event_staff.event_id = tickets.event_id
            AND event_staff.user_id = auth.uid()
            AND event_staff.status = 'active'
        )
    );

CREATE POLICY "Users can request tickets"
    ON tickets FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Event staff policies
CREATE POLICY "Event staff can be viewed by event organizers"
    ON event_staff FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM event_staff es
            WHERE es.event_id = event_staff.event_id
            AND es.user_id = auth.uid()
            AND es.status = 'active'
        )
    );

CREATE POLICY "Event staff can be managed by organizers"
    ON event_staff FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM event_staff es
            WHERE es.event_id = event_staff.event_id
            AND es.user_id = auth.uid()
            AND es.status = 'active'
        )
    );

-- Ticket validations policies
CREATE POLICY "Scanners can validate tickets"
    ON ticket_validations FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM event_staff
            WHERE event_staff.event_id = ticket_validations.event_id
            AND event_staff.user_id = auth.uid()
            AND event_staff.is_scanner = true
            AND event_staff.status = 'active'
        )
    );

CREATE POLICY "Event staff can view validations"
    ON ticket_validations FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM event_staff
            WHERE event_staff.event_id = ticket_validations.event_id
            AND event_staff.user_id = auth.uid()
            AND event_staff.status = 'active'
        )
    );

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_ticket_status()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE tickets
    SET status = 'used',
        used_at = NEW.validation_time
    WHERE id = NEW.ticket_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ticket_validated
    AFTER INSERT ON ticket_validations
    FOR EACH ROW
    EXECUTE FUNCTION update_ticket_status(); 