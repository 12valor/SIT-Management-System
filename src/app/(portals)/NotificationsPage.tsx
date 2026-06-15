"use client";

import React, { useEffect, useState } from "react";
import { Bell, CheckCircle2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getNotifications, markAllAsRead, markAsRead } from "@/lib/actions/notifications";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications().then((res) => {
      if (res.success && res.data) {
        setNotifications(res.data.notifications as Notification[]);
      }
      setLoading(false);
    });
  }, []);

  const handleMarkAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    await markAllAsRead();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Notifications Archive</h2>
          <p className="text-muted-foreground font-medium text-sm max-w-2xl">
            A complete history of all institutional updates and transmissions sent to your account.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.isRead)}
            className="h-10 px-4 bg-muted hover:bg-muted/80 text-muted-foreground font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Bell className="h-8 w-8 text-muted-foreground animate-pulse" />
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-6 hover:bg-muted/30 transition-all flex flex-col md:flex-row md:items-start gap-4",
                  !notification.isRead && "bg-primary/[0.02]"
                )}
                onClick={() => {
                  if (!notification.isRead) handleMarkAsRead(notification.id);
                }}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-3">
                    {!notification.isRead && (
                      <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    )}
                    <h3 className={cn(
                      "text-base font-bold",
                      !notification.isRead ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {notification.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                    {notification.message}
                  </p>
                  <div className="pl-5 pt-2 flex items-center gap-4">
                    <span className="text-xs font-medium text-muted-foreground/60">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                      {notification.type}
                    </span>
                  </div>
                </div>

                {notification.link && (
                  <div className="shrink-0 pt-2 md:pt-0">
                    <Link 
                      href={notification.link}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-primary font-bold text-xs transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No transmission records</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Your notifications archive is currently empty. Any official correspondence will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
