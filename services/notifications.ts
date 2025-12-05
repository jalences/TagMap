import * as Notifications from "expo-notifications";
import { Marker } from "../types";

export interface ActiveNotification {
  markerId: number;
  notificationId: string;
  timestamp: number;
}

export class NotificationManager {
  private activeNotifications = new Map<number, ActiveNotification>();

  async requestPermissions() {
    const settings = await Notifications.requestPermissionsAsync();
    if (!settings.granted) {
      throw new Error("Разрешение на уведомления не выдано");
    }
  }

  async showNotification(marker: Marker) {
    if (this.activeNotifications.has(marker.id)) return;

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Вы рядом с меткой!",
        body: marker.title || "Вы находитесь рядом с сохранённой точкой.",
      },
      trigger: null,
    });

    this.activeNotifications.set(marker.id, {
      markerId: marker.id,
      notificationId,
      timestamp: Date.now(),
    });
  }

  async removeNotification(markerId: number) {
    const stored = this.activeNotifications.get(markerId);
    if (!stored) return;

    await Notifications.cancelScheduledNotificationAsync(stored.notificationId);
    this.activeNotifications.delete(markerId);
  }
}

export const notificationManager = new NotificationManager();
