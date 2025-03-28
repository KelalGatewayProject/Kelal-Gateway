# Kelal Gateway - Mobile Ticketing System

A comprehensive mobile application that allows event organizers to create events, sell tickets, and validate attendees through QR code scanning, while providing attendees with a seamless ticket purchasing and event check-in experience.

## Features

- **Event Creation Dashboard** - Allow organizers to create events with details, pricing tiers, and capacity limits
- **Ticket Purchase Flow** - Simple checkout process with secure payment integration
- **QR Code Generation** - Unique QR codes for each ticket that can be saved to device wallet
- **Scanner Interface** - Camera-based QR scanner for event staff to quickly validate tickets
- **Attendee Management** - Track check-ins, manage guest lists, and view attendance analytics

## Getting Started

For detailed setup instructions, please refer to [COMPLETE_SETUP.md](COMPLETE_SETUP.md).

For deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Start

```bash
# Clone the repository
git clone https://github.com/KelalGatewayProject/Kelal-Gateway.git
cd Kelal-Gateway

# Install dependencies
npm install

# Set up environment variables (see COMPLETE_SETUP.md)

# Start development server
npm run dev
```

## Project Structure

```
├── backend/             # Backend server code
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Server entry point
├── public/              # Static assets
├── src/                 # Frontend React code
│   ├── components/      # Reusable components
│   ├── context/         # React context providers
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components
│   └── App.tsx          # Main application component
└── infrastructure/      # Deployment and infrastructure code
```

## User Roles

The application supports the following user roles:

- **Admin**: Full access to all features, including user management and event approval
- **Organizer**: Can create and manage events, staff, and view reports
- **Member**: Regular users who can browse events and purchase tickets
- **Attendee**: Users who have purchased tickets to events

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, Phone verification via Twilio
- **QR Code**: html5-qrcode for scanning, custom QR generation
- **Maps**: Leaflet, OpenStreetMap

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
