import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onViewTicket: () => void;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  ticketPrice: string;
  ticketNumber: string;
}

const TicketDrawer: React.FC<TicketDrawerProps> = ({
  isOpen,
  onClose,
  onViewTicket,
  eventTitle,
  eventDate,
  eventTime,
  ticketPrice,
  ticketNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        className="fixed top-[211px] right-0 w-[355px] h-[420px] bg-white rounded-l-[20px] shadow-lg transform transition-transform duration-300 ease-in-out"
        style={{
          borderTopLeftRadius: "5%",
          borderBottomLeftRadius: "5%",
        }}
      >
        <div className="p-6 flex flex-col items-center h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <img
            src="https://imgur.com/IblnJgd.png"
            alt="Kelal Logo"
            className="w-16 h-16 mb-4"
          />

          <h2 className="text-xl font-bold mb-2">FREE TICKET</h2>

          <p className="text-center text-sm mb-8">
            YOUR TICKET REQUEST HAS BEEN PROCESSED
          </p>

          <Button
            onClick={onViewTicket}
            className="w-full bg-[#0A1128] text-white py-3 mb-6 rounded-full"
          >
            YOUR TICKET
          </Button>

          <div className="flex justify-between w-full gap-4">
            <Button
              variant="outline"
              className="flex-1 border-[#0A1128] text-[#0A1128] py-2 rounded-full"
            >
              RECEIPT
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#0A1128] text-[#0A1128] py-2 rounded-full"
            >
              WALLET
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDrawer;
