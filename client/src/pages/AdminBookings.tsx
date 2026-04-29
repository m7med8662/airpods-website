import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Calendar, Mail, Phone, MapPin, CheckCircle, Clock, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AdminBookings() {
  const { user, loading } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "confirmed" | "cancelled" | "completed" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [editingStatus, setEditingStatus] = useState<"pending" | "confirmed" | "cancelled" | "completed">("pending");

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      window.location.href = "/";
    }
  }, [loading, user]);

  if (!loading && user?.role !== "admin") {
    return null;
  }

  // Fetch all bookings
  const { data: bookings = [], isLoading, refetch } = trpc.bookings.all.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  const updateStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Booking updated");
      refetch();
      setEditingId(null);
    },
    onError: () => {
      toast.error("Failed to update booking");
    },
  });

  const deleteBooking = trpc.bookings.delete.useMutation({
    onSuccess: () => {
      toast.success("Booking deleted");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete booking");
    },
  });



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  const statusConfig = {
    pending: { color: "bg-yellow-500/20 text-yellow-300", icon: Clock, label: "Pending" },
    confirmed: { color: "bg-green-500/20 text-green-300", icon: CheckCircle, label: "Confirmed" },
    cancelled: { color: "bg-red-500/20 text-red-300", icon: XCircle, label: "Cancelled" },
    completed: { color: "bg-blue-500/20 text-blue-300", icon: CheckCircle, label: "Completed" },
  };

  const filteredBookings = selectedStatus
    ? bookings.filter((b) => b.status === selectedStatus)
    : bookings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Booking Management</h1>
          <p className="text-white/50">View and manage all AirPods booking reservations</p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Button
            onClick={() => setSelectedStatus(null)}
            variant={selectedStatus === null ? "default" : "outline"}
            className={selectedStatus === null ? "bg-[#0071E3]" : ""}
          >
            All ({bookings.length})
          </Button>
          {(["pending", "confirmed", "cancelled", "completed"] as const).map((status) => {
            const count = bookings.filter((b) => b.status === status).length;
            return (
              <Button
                key={status}
                onClick={() => setSelectedStatus(status)}
                variant={selectedStatus === status ? "default" : "outline"}
                className={selectedStatus === status ? "bg-[#0071E3]" : ""}
              >
                {statusConfig[status].label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Bookings Grid */}
        {isLoading ? (
          <div className="text-center text-white/50">Loading bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center text-white/50 py-12">
            <p>No bookings found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => {
              const StatusIcon = statusConfig[booking.status].icon;
              const isEditing = editingId === booking.id;

              return (
                <Card
                  key={booking.id}
                  className="bg-white/5 border-white/10 p-6 hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{booking.customerName}</h3>
                        <Badge className={`${statusConfig[booking.status].color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[booking.status].label}
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm">{booking.productName}</p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4 text-[#0071E3]" />
                      {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <MapPin className="w-4 h-4 text-[#0071E3]" />
                      {booking.location}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Mail className="w-4 h-4 text-[#0071E3]" />
                      {booking.customerEmail}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Phone className="w-4 h-4 text-[#0071E3]" />
                      {booking.customerPhone}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mb-4">
                    {isEditing ? (
                      <textarea
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm focus:border-[#0071E3] focus:outline-none"
                        placeholder="Add notes..."
                        rows={3}
                      />
                    ) : (
                      <div className="text-xs text-white/50 bg-white/5 rounded p-3">
                        {booking.notes || "No notes"}
                      </div>
                    )}
                  </div>

                  {/* Status Update */}
                  {isEditing && (
                    <div className="mb-4">
                      <select
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value as any)}
                        className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm focus:border-[#0071E3] focus:outline-none"
                      >
                        {(["pending", "confirmed", "cancelled", "completed"] as const).map((s) => (
                          <option key={s} value={s}>
                            {statusConfig[s].label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 justify-end">
                    {isEditing ? (
                      <>
                        <Button
                          size="sm"
                        onClick={() => {
                          updateStatus.mutate({
                            id: booking.id,
                            status: editingStatus,
                            notes: editingNotes,
                          });
                        }}
                          className="bg-[#0071E3] hover:bg-[#0077ED]"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(booking.id);
                            setEditingNotes(booking.notes || "");
                            setEditingStatus(booking.status);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Delete this booking?")) {
                              deleteBooking.mutate({ id: booking.id });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
