import React from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function QRCodeTicketExample() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Event Ticket</h1>
        <div className="mb-6">
          <QRCodeGenerator
            value={JSON.stringify({
              type: "event_ticket",
              eventId: "event-123",
              userId: "user-456",
              ticketId: "ticket-789",
              timestamp: new Date().toISOString(),
            })}
            size={200}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Event:</span>
            <span>Summer Music Festival</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>Aug 15, 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Time:</span>
            <span>4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Ticket #:</span>
            <span>T1234</span>
          </div>
        </div>
      </div>
    </div>
  );
}
