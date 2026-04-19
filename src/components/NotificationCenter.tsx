"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  ExternalLink, 
  FileText, 
  Briefcase, 
  Monitor, 
  X,
  Loader2,
  Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getNotifications, markAsRead, markAllAsRead } from "@/lib/actions/notifications";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    setIsLoading(true);
    const result = await getNotifications();
    if (result.success && result.data) {
      setNotifications(result.data.notifications as any);
      setUnreadCount(result.data.unreadCount);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    
    // Simple polling for a "production-ready" feel without complex WS
    const interval = setInterval(fetchNotifications, 60000); // Refetch every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await markAsRead(id);
    if (result.success) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllAsRead();
    if (result.success) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'LOGBOOK': return <FileText className="h-4 w-4 text-indigo-500" />;
      case 'APPLICATION': return <Briefcase className="h-4 w-4 text-emerald-500" />;
      case 'EVALUATION': return <Monitor className="h-4 w-4 text-violet-500" />;
      default: return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative h-12 w-12 rounded-[1.25rem] border flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm group",
          isOpen 
            ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-xl" 
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400"
        )}
      >
        <Bell className={cn("h-5 w-5 transition-colors", isOpen ? "" : "group-hover:text-indigo-600")} />
        {unreadCount > 0 && (
          <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900 shadow-lg shadow-rose-500/20 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 md:w-96 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-2xl z-50 overflow-hidden animate-in-slide-down">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-widest">Notification Hub</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{unreadCount} Pending Intel</p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                <CheckCheck className="h-3 w-3" />
                Clear All
              </button>
            )}
          </div>

          {/* Content */}
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {isLoading && notifications.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Matrix...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center gap-4 opacity-30">
                <Inbox className="h-8 w-8 text-slate-400" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">All clean. No new intel.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "p-5 transition-colors relative group",
                      notification.isRead ? "opacity-60" : "bg-indigo-50/30 dark:bg-indigo-600/5"
                    )}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                    )}
                    
                    <div className="flex gap-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center shadow-sm">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={cn(
                            "text-[11px] font-black uppercase tracking-tight truncate",
                            notification.isRead ? "text-slate-600 dark:text-slate-400" : "text-slate-950 dark:text-white"
                          )}>
                            {notification.title}
                          </h4>
                          <span className="text-[9px] font-bold text-slate-400 flex-shrink-0 whitespace-nowrap mt-0.5">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="mt-3 flex items-center gap-3">
                          {notification.link && (
                            <Link 
                              href={notification.link}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-1.5 text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] hover:opacity-70"
                            >
                              Open Portal <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          )}
                          {!notification.isRead && (
                            <button 
                              onClick={(e) => handleMarkAsRead(notification.id, e)}
                              className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors"
                            >
                              <CheckCheck className="h-2.5 w-2.5" /> Mark Read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
             <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                <Clock className="h-3 w-3" />
                Live Industrial Hub
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
