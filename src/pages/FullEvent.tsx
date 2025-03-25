import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const FullEvent: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Event Image */}
      <div className="relative h-64 bg-gray-300">
        <img
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=600&q=80"
          alt="Julian Marley"
          className="w-full h-full object-cover"
        />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>

        {/* Like and Share buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setLiked(!liked)}
            className="bg-black bg-opacity-50 p-2 rounded-full"
          >
            <Heart
              className={`h-5 w-5 ${liked ? "text-red-500 fill-red-500" : "text-white"}`}
            />
          </button>
          <button className="bg-black bg-opacity-50 p-2 rounded-full">
            <Share2 className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Event Details */}
      <div className="relative z-10 p-4 bg-white rounded-t-3xl -mt-6">
        <h1 className="text-2xl font-bold mb-2">JULIAN MARLEY</h1>
        <p className="text-gray-600 mb-4">
          Festival lovers, families, reggae lovers!!!
        </p>

        {/* Event Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="font-semibold">Saturday, July 20, 2024</p>
              <p className="text-sm text-gray-500">Doors open at 6:00 PM</p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="font-semibold">7:00 PM - 11:00 PM</p>
              <p className="text-sm text-gray-500">4 hours</p>
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="font-semibold">Ghion Hotel</p>
              <p className="text-sm text-gray-500">Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="font-semibold">Organized by Shega Events</p>
              <p className="text-sm text-gray-500">+251 94 157 5050</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">ABOUT</h2>
          <p className="text-gray-600">
            Julian Marley, son of reggae legend Bob Marley, brings his "As I Am
            Tour" to Addis Ababa! Experience an unforgettable night of roots
            reggae music with positive vibrations.
          </p>
          <p className="text-gray-600 mt-2">
            The concert will feature Julian's greatest hits and tracks from his
            Grammy-nominated album "As I Am". Don't miss this rare opportunity
            to see a member of reggae royalty live in concert!
          </p>
        </div>

        {/* Ticket Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">TICKETS</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold">General Admission</p>
                <p className="text-sm text-gray-500">Standing area</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-500">600 ETB</p>
                <p className="text-xs text-gray-500">+ 50 ETB service fee</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold">VIP</p>
                <p className="text-sm text-gray-500">
                  Reserved seating + meet & greet
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-500">1,200 ETB</p>
                <p className="text-xs text-gray-500">+ 100 ETB service fee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Tickets Button */}
        <Button className="w-full bg-[#0A1128] text-white font-bold py-4 rounded-lg">
          BUY TICKETS
        </Button>
      </div>
    </PageLayout>
  );
};

export default FullEvent;
