import React, { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole, rolePermissions } from "../types/roles";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Users,
  Calendar,
  CreditCard,
  Settings,
  Shield,
  Building,
  BarChart,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload,
  DollarSign,
  Megaphone,
  Bell,
  CheckSquare,
  Ticket,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { isAdmin, userProfile } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerLink, setBannerLink] = useState("");

  // Check for tab parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (
      tabParam &&
      [
        "overview",
        "users",
        "events",
        "sponsorships",
        "organizers",
        "settings",
        "approvals",
        "sales",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Stats data
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Active Events",
      value: "42",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Total Revenue",
      value: "$24,780",
      icon: <CreditCard className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Pending Approvals",
      value: "7",
      icon: <Shield className="h-5 w-5 text-orange-500" />,
    },
  ];

  // Recent users data
  const recentUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "member",
      joined: "2023-06-15",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "organizer",
      joined: "2023-06-14",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "member",
      joined: "2023-06-13",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "member",
      joined: "2023-06-12",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      role: "organizer",
      joined: "2023-06-11",
    },
  ];

  // Pending events data
  const pendingEvents = [
    {
      id: 1,
      name: "Summer Music Festival",
      organizer: "Event Masters Inc.",
      date: "2023-08-15",
      status: "Pending Review",
    },
    {
      id: 2,
      name: "Tech Conference 2023",
      organizer: "TechHub",
      date: "2023-09-22",
      status: "Pending Review",
    },
    {
      id: 3,
      name: "Food & Wine Expo",
      organizer: "Culinary Arts Group",
      date: "2023-07-30",
      status: "Pending Review",
    },
  ];

  // Sponsorship data
  const sponsorships = [
    {
      id: 1,
      name: "Summer Festival Promo",
      location: "Home Screen",
      impressions: 12480,
      clicks: 843,
      revenue: "$1,250",
      status: "Active",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=350&q=80",
    },
    {
      id: 2,
      name: "New Club Opening",
      location: "Event Details",
      impressions: 8320,
      clicks: 621,
      revenue: "$950",
      status: "Active",
      startDate: "2023-06-15",
      endDate: "2023-07-15",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=350&q=80",
    },
    {
      id: 3,
      name: "Weekend Special",
      location: "Ticket Screen",
      impressions: 5640,
      clicks: 412,
      revenue: "$750",
      status: "Active",
      startDate: "2023-06-10",
      endDate: "2023-06-25",
      image:
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=350&q=80",
    },
    {
      id: 4,
      name: "New Artist Promotion",
      location: "Splash Screen",
      impressions: 15200,
      clicks: 1250,
      revenue: "$1,800",
      status: "Scheduled",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=350&q=80",
    },
  ];

  // Sponsorship locations and pricing
  const sponsorshipLocations = [
    {
      id: 1,
      name: "Splash Screen",
      price: "$1,800",
      impressions: "15,000+",
      description: "Shown when app launches",
    },
    {
      id: 2,
      name: "Home Screen",
      price: "$1,200",
      impressions: "12,000+",
      description: "Banner at bottom of home feed",
    },
    {
      id: 3,
      name: "Calendar Screen",
      price: "$1,100",
      impressions: "10,000+",
      description: "Banner below calendar view",
    },
    {
      id: 4,
      name: "Event Details",
      price: "$900",
      impressions: "8,000+",
      description: "Banner within event details",
    },
    {
      id: 5,
      name: "Ticket Screen",
      price: "$750",
      impressions: "5,500+",
      description: "Banner on digital tickets",
    },
    {
      id: 6,
      name: "Between Events",
      price: "$600",
      impressions: "4,000+",
      description: "Interstitial between event listings",
    },
  ];

  const handleBannerUpload = () => {
    // In a real implementation, this would handle file upload
    alert(
      "Banner uploaded successfully! It will appear in selected locations.",
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">
            Welcome, {userProfile?.name || "Admin"}
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-8 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger
              value="sponsorships"
              className="flex items-center gap-2"
            >
              <Megaphone className="h-4 w-4" />
              Sponsorships
            </TabsTrigger>
            <TabsTrigger value="organizers" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Organizers
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Approvals
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-full">
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${user.role === "organizer" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">{user.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pending Events */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Events</CardTitle>
                <CardDescription>Events awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Event Name</th>
                        <th className="px-6 py-3">Organizer</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {event.name}
                          </td>
                          <td className="px-6 py-4">{event.organizer}</td>
                          <td className="px-6 py-4">{event.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:underline mr-3">
                              Review
                            </button>
                            <button className="text-green-600 hover:underline mr-3">
                              Approve
                            </button>
                            <button className="text-red-600 hover:underline">
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage all users in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  User management functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Management</CardTitle>
                <CardDescription>
                  Manage all events in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Event management functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sponsorships" className="space-y-6">
            {/* Sponsorship Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Active Sponsorships
                      </p>
                      <p className="text-2xl font-bold mt-1">3</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <Megaphone className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Impressions
                      </p>
                      <p className="text-2xl font-bold mt-1">41,640</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Sponsorship Revenue
                      </p>
                      <p className="text-2xl font-bold mt-1">$4,750</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload New Banner */}
            <Card>
              <CardHeader>
                <CardTitle>Upload New Sponsorship Banner</CardTitle>
                <CardDescription>
                  Create a new sponsored banner to display in the app (350×95
                  px)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Banner Image URL
                      </label>
                      <div className="flex">
                        <Input
                          type="text"
                          placeholder="https://example.com/banner.jpg"
                          value={bannerUrl}
                          onChange={(e) => setBannerUrl(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" className="ml-2">
                          <Upload className="h-4 w-4 mr-2" />
                          Browse
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended size: 350×95 pixels
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination URL
                      </label>
                      <div className="flex">
                        <Input
                          type="text"
                          placeholder="https://example.com/promotion"
                          value={bannerLink}
                          onChange={(e) => setBannerLink(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" className="ml-2">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Locations
                      </label>
                      <div className="space-y-2">
                        {sponsorshipLocations.map((location) => (
                          <div key={location.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`location-${location.id}`}
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`location-${location.id}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {location.name} ({location.price})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Duration
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Start Date
                          </label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            End Date
                          </label>
                          <Input type="date" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button onClick={handleBannerUpload} className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Banner & Create Campaign
                      </Button>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="send-notification"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="send-notification"
                            className="ml-2 text-xs text-gray-700"
                          >
                            Send push notification
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          Total: $3,450.00
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-xs uppercase text-gray-500 mb-2">
                      SPONSORED
                    </p>
                    <div className="relative w-[350px] h-[95px] bg-gray-100 rounded overflow-hidden shadow-sm">
                      {bannerUrl ? (
                        <img
                          src={bannerUrl}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">
                            Banner Preview
                          </span>
                        </div>
                      )}
                      <button className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Discover More
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Banner preview with "Discover More" button
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Sponsorships */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sponsorships</CardTitle>
                <CardDescription>
                  Currently running sponsored banners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Banner</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Impressions</th>
                        <th className="px-4 py-3">Clicks</th>
                        <th className="px-4 py-3">Revenue</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sponsorships.map((sponsorship) => (
                        <tr
                          key={sponsorship.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <img
                              src={sponsorship.image}
                              alt={sponsorship.name}
                              className="w-20 h-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {sponsorship.name}
                          </td>
                          <td className="px-4 py-3">{sponsorship.location}</td>
                          <td className="px-4 py-3">
                            {sponsorship.impressions.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            {sponsorship.clicks.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">{sponsorship.revenue}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${sponsorship.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                            >
                              {sponsorship.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:underline mr-2">
                              Edit
                            </button>
                            <button className="text-red-600 hover:underline">
                              Pause
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Sponsorship Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Sponsorship Locations & Pricing</CardTitle>
                <CardDescription>
                  Available banner placement locations and their pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sponsorshipLocations.map((location) => (
                    <div
                      key={location.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium text-lg">{location.name}</h3>
                      <p className="text-2xl font-bold text-blue-600 my-2">
                        {location.price}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {location.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Estimated impressions: {location.impressions} monthly
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizers">
            <Card>
              <CardHeader>
                <CardTitle>Organizer Management</CardTitle>
                <CardDescription>Manage event organizers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Organizer management functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Event Approvals</CardTitle>
                <CardDescription>
                  Review and approve pending events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Event Name</th>
                        <th className="px-6 py-3">Organizer</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {event.name}
                          </td>
                          <td className="px-6 py-4">{event.organizer}</td>
                          <td className="px-6 py-4">{event.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:underline mr-3">
                              Review
                            </button>
                            <button className="text-green-600 hover:underline mr-3">
                              Approve
                            </button>
                            <button className="text-red-600 hover:underline">
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>
                  Revenue and sales performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Total Revenue
                          </p>
                          <p className="text-2xl font-bold mt-1">$24,780</p>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-full">
                          <DollarSign className="h-5 w-5 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Ticket Sales
                          </p>
                          <p className="text-2xl font-bold mt-1">1,248</p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Ticket className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Conversion Rate
                          </p>
                          <p className="text-2xl font-bold mt-1">8.7%</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                          <BarChart className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-500">
                  Detailed sales analytics and reporting will be implemented
                  here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Settings functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
