"use client";

import React, { useEffect, useState } from "react";
import { Bell, BellDot, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getNotifications, markAsRead, markAllAsRead } from "@/lib/actions/notifications";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
}

export function NotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    const result = await getNotifications();
    if (result.success && result.data) {
      setNotifications(result.data.notifications);
      setUnreadCount(result.data.unreadCount);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string, link?: string | null) => {
    await markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    if (link) {
      router.push(link);
      setIsOpen(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-10 w-10 flex items-center justify-center rounded-xl hover:bg-muted transition-all active:scale-90"
      >
        {unreadCount > 0 ? (
          <>
            <BellDot className="h-5 w-5 text-primary animate-pulse" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </>
        ) : (
          <Bell className="h-5 w-5 text-muted-foreground/60" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed inset-x-4 top-[80px] md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 w-auto md:w-96 bg-card border border-border rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden"
            >
              <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Notifications</h3>
                    <p className="text-[10px] font-medium text-muted-foreground">{unreadCount} unread transmissions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllAsRead}
                      className="text-[10px] font-black uppercase tracking-tighter text-primary hover:opacity-70 transition-opacity"
                    >
                      Clear All
                    </button>
                  )}
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] md:max-h-[450px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-border/40">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "p-5 hover:bg-muted/50 transition-all group relative cursor-pointer",
                          !notification.isRead && "bg-primary/[0.03]"
                        )}
                        onClick={() => handleMarkAsRead(notification.id, notification.link)}
                      >
                        {!notification.isRead && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                        )}
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <h4 className={cn(
                              "text-[13px] font-bold leading-tight tracking-tight",
                              !notification.isRead ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {notification.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-wider">
                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                              </span>
                              {!notification.isRead && (
                                <span className="h-1 w-1 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                          {notification.link && (
                            <div className="shrink-0">
                              <div className="h-9 w-9 rounded-xl bg-secondary border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                <ExternalLink className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center space-y-4 px-6">
                    <div className="h-16 w-16 rounded-3xl bg-muted flex items-center justify-center mx-auto rotate-12 opacity-40">
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">All caught up</p>
                      <p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
                        No new institutional updates detected in your transmission logs.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-4 bg-muted/30 border-t border-border">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/notifications'); // Assuming a dedicated page exists or will exist
                    }}
                    className="w-full h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-all"
                  >
                    View All Archives
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
